const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/signup', require('./routes/authRoutes'));
app.use('/login', require('./routes/authRoutes'));
app.use('/books', require('./routes/bookRoutes'));
app.use('/', require('./routes/reviewRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
