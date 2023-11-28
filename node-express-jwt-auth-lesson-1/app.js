// const express = require("express");
// const mongoose = require('mongoose');
// const authRoutes = require('./Routes/authRoutes');
// const cookieParser = require("cookie-parser");
// const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// const app = express();

// // middleware
// app.use(express.static('public'));
// app.use(express.json());
// app.use(cookieParser());

// // view engine
// app.set('view engine', 'ejs');

// // database connection
// // pwd: z0tEgONn5PSctHx1
// const dbURI = 'mongodb+srv://benoketch2:z0tEgONn5PSctHx1@cluster0.tmr1qjw.mongodb.net/?retryWrites=true&w=majority';
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
//   .then((result) => app.listen(3000))
//   .catch((err) => console.log(err));

// // routes
// app.get('*', checkUser);
// app.get('/', (req, res) => res.render('home'));
// app.get('/smoothies', requireAuth,(req, res) => res.render('smoothies'));
// app.use(authRoutes);


// //Cookies

// // app.get("/set-cookies", (req, res) => {
// //   //res.setHeader("set-Cookie", "newUser = true");

// //   res.cookie("newUser", false);
// //   res.cookie("isEmployee", true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
// //   res.send("You got the cookie!");
// // });

// // app.get("/read-cookies", (req, res) => {
// //   const cookies = req.cookies;
// //   console.log(cookies.newUser);
// //   res.json({cookies} );
// // });

// // const port = 3000;

// // app.listen(port, () => {
// //   console.log(`Server up and running on Port-${port}`);
// // })

const express = require("express");
const mongoose = require('mongoose');
const authRoutes = require('./Routes/authRoutes');
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://benoketch2:z0tEgONn5PSctHx1@cluster0.tmr1qjw.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// middleware to check user on every route
app.get('*', checkUser);

// routes
app.get('/', (req, res) => res.render('home', { user: res.locals.user }));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies', { user: res.locals.user }));
app.use(authRoutes);
