// app.js

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

// Middleware setup
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Import routers
const { indexRouter
} = require("./routers");

// Use routers
app.use("/", indexRouter); // Line 22



//DB CONNECTION CHECK
const { dbConf, dbQuery } = require("./config/db");

//FOR POOLING CONNECTION
dbConf.getConnection((error, connection) => {
  if (error) {
    console.log("Error db Connection!", error.sqlMessage);
  }

});

module.exports = app;
