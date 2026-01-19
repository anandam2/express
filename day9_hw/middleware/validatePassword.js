module.exports = (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.render('login', { message: 'Password must be at least 6 characters' });
  }
  next();
};