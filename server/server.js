import express from 'express';

import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import helmet from 'helmet';
// import _ from 'lodash';

const port = process.env.PORT || 3003;
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());

// Database config
const config = require('./config/database');
require('./config/passport')(passport);

mongoose.Promise = require('bluebird');

mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));

// Routes
const authRoutes = require('./app/routes/auth');
const userRoutes = require('./app/routes/user');
const courseRoutes = require('./app/routes/course');
const reviewRoutes = require('./app/routes/review');
const commentRoutes = require('./app/routes/comment');

app.use('/auth', authRoutes);
app.use('/', userRoutes);
app.use('/', courseRoutes);
app.use('/', reviewRoutes);
app.use('/', commentRoutes);

// Comment routes
// TODO

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
