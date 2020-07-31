const express = require('express');
const { config } = require('dotenv');

const env = process.env.NODE_ENV || 'dev';
config({
  path: `${__dirname}/../config/.env.${env}`,
});

const port = process.env.PORT || 3001;

const app = express();

app.listen(5000, () => {
  console.log(`Server running on port ${port}`);
});
