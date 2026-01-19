module.exports = (req, res, next) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.render('login', { message: 'Invalid email format' });
  }
  next();
};