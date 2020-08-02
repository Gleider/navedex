const express = require('express');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.post('/signup', AuthController.signup);
routes.post('/login', AuthController.login);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

module.exports = routes;
