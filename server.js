require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const helmet = require('helmet');

const { mongoose } = require('./db/mongoose');
const userRoute = require('./routes/user');
const statsRoute = require('./routes/stats');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Routes
app.use(`/user`, userRoute);
app.use(`/stats`, statsRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = {
  app
};
