const Book = require('../models/Book');
const Review = require('../models/Review');

const createBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

const getBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, 'i');
  if (genre) filter.genre = new RegExp(genre, 'i');
  const books = await Book.find(filter).skip((page - 1) * limit).limit(Number(limit));
  res.json(books);
};

const getBookDetails = async (req, res) => {
  const book = await Book.findById(req.params.id);
  const reviews = await Review.find({ book: book._id });
  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);
  res.json({ book, avgRating, reviews });
};

const searchBooks = async (req, res) => {
  const { q } = req.query;
  const books = await Book.find({
    $or: [
      { title: new RegExp(q, 'i') },
      { author: new RegExp(q, 'i') },
    ]
  });
  res.json(books);
};

module.exports = { createBook, getBooks, getBookDetails, searchBooks };
