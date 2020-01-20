const { Router } = require('express'); //importando apenas o modulo de rotas
const DevController = require('../src/controllers/DevController');
const SearchController = require('../src/controllers/SearchController');
const routes = Router();

routes.get('/devs', DevController.index); //pegando todos os usuarios
routes.post('/devs', DevController.store); //cadastrando um usuario

routes.get('/search', SearchController.index)

module.exports = routes; //exportando o objeto de rotas