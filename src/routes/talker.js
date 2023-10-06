const express = require('express');
const fs = require('fs/promises');
const { join } = require('path');

const router = express.Router();

const readFile = async () => {
  const data = await fs.readFile(join(__dirname, '../talker.json'), 'utf8');
  return JSON.parse(data);
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

module.exports = router;