const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createBook, getBooks, getBookDetails, searchBooks } = require('../controllers/bookController');

router.post('/', auth, createBook);
router.get('/', getBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookDetails);

module.exports = router;
