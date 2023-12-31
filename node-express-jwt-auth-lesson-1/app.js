const express = require("express");
const mongoose = require('mongoose');
const authRoutes = require('./Routes/authRoutes');
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

require('dotenv').config();


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// middleware to check user on every route
app.get('*', checkUser);

// routes
app.get('/', (req, res) => res.render('home', { user: res.locals.user }));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies', { user: res.locals.user }));
app.use(authRoutes);
