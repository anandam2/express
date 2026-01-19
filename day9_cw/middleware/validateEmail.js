module.exports = function validateEmail(req, res, next) {
  const { email } = req.body;
  if (!email) return res.render('login', { message: 'Email is required', errors: [] });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return res.render('login', { message: 'Invalid email format', errors: [] });

  next();
};