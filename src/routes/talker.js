const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const TokenValidation = require('../middlewares/TokenValidation');
const TalkerValidation = require('../middlewares/TalkerValidation');

const router = express.Router();
const talkerJson = '../talker.json';

const readFile = async () => {
  try {
    const data = await fs.readFile(path.resolve(__dirname, talkerJson));
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};

const writeFile = async (name, age, talk) => {
  const list = await readFile();
  const id = list.length + 1;
  const newTalker = { name, age, talk, id };
  const data = await fs.readFile(path.resolve(__dirname, talkerJson));
  const talkers = JSON.parse(data);
  talkers.push(newTalker);

  await fs.writeFile(path.resolve(__dirname, talkerJson), JSON.stringify(talkers));

  return newTalker;
};

const updateFile = async (id, data) => {
  try {
    const list = await fs.readFile(path.resolve(__dirname, talkerJson));
    const datas = JSON.parse(list);
    let foundedTalker = false;
    const updated = datas.map((talker) => {
      if (talker.id === id) {
        foundedTalker = true;
        return { ...talker, ...data };
      }
      return talker;
    });
    if (!foundedTalker) throw new Error('Pessoa palestrante não encontrada');
    await fs.writeFile(path.resolve(__dirname, talkerJson), JSON.stringify(updated));
  } catch (error) {
    throw new Error(error);
  }
};

const deleteFile = async (id) => {
  try {
    const data = await readFile();
    const filtered = data.map((talker) => talker.id !== id);

    await fs.writeFile(path.resolve(__dirname, talkerJson), JSON.stringify(filtered));
  } catch (error) {
    throw new Error(error);
  }
};

router.get('/talker', async (_req, res) => {
  const talkers = await readFile();
  if (talkers.length === 0) return res.status(200).json([]);
  res.status(200).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const talker = talkers.find((t) => t.id === Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

router.post('/talker', TokenValidation, TalkerValidation, async (req, res) => {
  try {
    const { name, age, talk } = req.body;
  
    const talker = await writeFile(name, age, talk);

    return res.status(201).json(talker);
  } catch (error) {
    return res.status(404).json({ message: 'Erro ao adicionar pessoa palestrante' });
  }
});

router.put('/talker/:id', TokenValidation, TalkerValidation, async (req, res) => {
  try {
    const { name, age, talk } = req.body;
    const { id } = req.params;

    await updateFile(Number(id), { name, age, talk });
    const data = await readFile();
    const listed = data.find((t) => t.id === Number(id));
    return res.status(200).json(listed);
  } catch (error) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

router.delete('/talker/:id', TokenValidation, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteFile(Number(id));
    return res.status(204).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

module.exports = router;