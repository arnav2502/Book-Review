const Review = require('../models/Review');

const createReview = async (req, res) => {
  const exists = await Review.findOne({ user: req.user._id, book: req.params.id });
  if (exists) return res.status(400).json({ message: 'Review already exists' });

  const review = new Review({ ...req.body, user: req.user._id, book: req.params.id });
  await review.save();
  res.status(201).json(review);
};

const updateReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id, user: req.user._id });
  if (!review) return res.status(403).json({ message: 'Unauthorized' });

  Object.assign(review, req.body);
  await review.save();
  res.json(review);
};

const deleteReview = async (req, res) => {
  const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!review) return res.status(403).json({ message: 'Unauthorized' });
  res.json({ message: 'Deleted' });
};

module.exports = { createReview, updateReview, deleteReview };
