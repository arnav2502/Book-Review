const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ message: 'User registered' });
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

module.exports = { signup, login };
