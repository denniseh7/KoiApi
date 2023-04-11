const express = require('express');
const compression = require('compression');
require('dotenv').config();
// const cors = require('cors');
const path = require('path');
const router = require('./router');

const app = express();

// middleware
// parser
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors);

// static page
app.use(express.static(path.join(__dirname, '../client/dist')));

// router
app.use('/', router);

// create Port and listen
const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening at http:/localhost: ${PORT}`);
