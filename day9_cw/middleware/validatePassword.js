module.exports = function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password) return res.render('login', { message: 'Password is required', errors: [] });
  if (password.length < 6) return res.render('login', { message: 'Password must be at least 6 characters', errors: [] });
  next();
};