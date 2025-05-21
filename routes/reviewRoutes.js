const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createReview, updateReview, deleteReview } = require('../controllers/reviewController');

router.post('/books/:id/reviews', auth, createReview);
router.put('/reviews/:id', auth, updateReview);
router.delete('/reviews/:id', auth, deleteReview);

module.exports = router;
