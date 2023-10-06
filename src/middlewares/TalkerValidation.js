const maiorOuIgual = (rate) => rate >= 1 && rate <= 5;

const nameIsValid = (name) => {
  if (!name) { 
    throw new Error('O campo "name" é obrigatório');
  }

  if (name.length < 3) { 
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
};

const ageIsValid = (age) => {
  if (!age) { 
    throw new Error('O campo "age" é obrigatório');
  }

  if (Number.isInteger(age) === false || age < 18) { 
    throw new Error('O campo "age" deve ser um número inteiro igual ou maior que 18');
  }
};

const talkIsValid = (talk) => {
  if (!talk) { 
    throw new Error('O campo "talk" é obrigatório');
  }
};

const rateIsValid = (rate) => {
  if (rate === undefined || rate === null) { 
    throw new Error('O campo "rate" é obrigatório');
  }

  if (Number.isInteger(rate) === false || !maiorOuIgual(rate)) { 
    throw new Error('O campo "rate" deve ser um número inteiro entre 1 e 5');
  }
};

const WatchedAtIsValid = (watchedAt) => {
  const padrãoddmmaaaa = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!watchedAt) { 
    throw new Error('O campo "watchedAt" é obrigatório');
  }
  if (watchedAt && !padrãoddmmaaaa.test(watchedAt)) { 
    throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
  }
};

const TalkerValidation = (req, res, next) => {
  try {
    const { name, age, talk } = req.body;
    nameIsValid(name);
    ageIsValid(age);
    talkIsValid(talk);
  
    const { watchedAt, rate } = talk;
    WatchedAtIsValid(watchedAt);
    rateIsValid(rate);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = TalkerValidation;