const express = require('express');

const talker = require('./routes/talker');

const loginData = require('./middlewares/loginData');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

const createToken = () => {
  const token1 = Math.random().toString(16).substr(2);
  const token2 = Math.random().toString(16).substr(2);
  const token3 = `${token1}${token2}.slice(0, 16)`;
  return token3;
};

app.post('/login', loginData, async (req, res) => {
  const token = createToken();
  return res.status(200).json({ token });
});
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.use(talker);
