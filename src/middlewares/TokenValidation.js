function TokenValidation(req, res, next) {
  const tokenValidation = req.headers.authorization;
  if (!tokenValidation) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (tokenValidation.length !== 16 || typeof tokenValidation !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
}

module.exports = TokenValidation;