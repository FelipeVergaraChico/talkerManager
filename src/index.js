const express = require('express');

const talker = require('./routes/talker');

const loginData = require('./middlewares/loginData');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.post('/login', loginData, async (req, res) => {
  const empty = '';
  const token = (Math.random() + empty).substring(2, 10) + (Math.random() + empty).substring(2, 10);
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
