const express = require('express');
const AuthController = require('./controllers/AuthController');
const NaverController = require('./controllers/NaverController');
const ProjectController = require('./controllers/ProjectController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/signup', AuthController.signup);
routes.post('/login', AuthController.login);

routes.use(authMiddleware);
// all routes below need authorization
// Navers
routes.get('/navers', NaverController.index);
routes.get('/navers/:id', NaverController.show);
routes.post('/navers', NaverController.store);
routes.put('/navers/:id', NaverController.update);
routes.delete('/navers/:id', NaverController.delete);

// Projects
routes.get('/projects', ProjectController.index);
routes.get('/projects/:id', ProjectController.show);
routes.post('/projects', ProjectController.store);
routes.put('/projects/:id', ProjectController.update);
routes.delete('/projects/:id', ProjectController.delete);

module.exports = routes;
