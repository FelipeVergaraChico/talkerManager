const loginData = (req, res, next) => {
    const { email, password } = req.body;
    const regexemail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexPassword = /^.{6,}$/;
    if (!email) {
        return res.status(400).json({ message: 'O campo \"email\" é obrigatório' });
    }
    if (!regexemail.test(email)) {
        return res.status(400).json({ message: 'O \"email\" deve ter o formato \"email@email.com\"' });
    }
    if (!password) {
        return res.status(400).json({ message: 'O campo \"password\" é obrigatório' });
    }
    if (!regexPassword.test(password)) {
        return res.status(400).json({ message: 'O \"password\" deve ter pelo menos 6 caracteres' });
    }
    next();
};

module.exports = loginData;