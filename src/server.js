const express = require('express');
const { config } = require('dotenv');
const routes = require('./routes');
const envConfig = require('../config/envConfig');
const { generalErrors } = require('./middlewares/errors');

config(envConfig);

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(routes);

app.use(generalErrors);

app.listen(5000, () => console.log(`Server running on port ${port}`));
