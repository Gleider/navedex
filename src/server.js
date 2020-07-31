const express = require('express');
const { config } = require('dotenv');
const routes = require('./routes');
const envConfig = require('../config/envConfig');

config(envConfig);

const port = process.env.PORT || 3001;

const app = express();
app.use(routes);
app.listen(5000, () => {
  console.log(`Server running on port ${port}`);
});
