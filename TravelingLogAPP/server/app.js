const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const {notFound, errorHandler} = require('./middlewares/middleWare')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//Specifing allowed origin e.g ('http://localhost:3000')
const allowedOrigin = 'http://localhost:3000';
app.use(cors({
  origin: allowedOrigin,
}));//Setting up the CORS middleware
app.use(express.json());
app.use(morgan('dev'));//Employing the use of morgan middleware
app.use(helmet());// Use Helmet middleware

app.use('/uploads', express.static('uploads')); // Enable serving uploaded media files



mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.log('Error connecting to MongoDB:', error.message);
  process.exit(1);// Terminate the application on MongoDB connection error
});
//Implementing the routes
app.get('/', (req,res) => {
  res.json({
    message: 'Hello World',
  });
});

// notFound middleware is used to handle 404 errors.
app.use(notFound);
// errorHandler middleware
app.use(errorHandler);
