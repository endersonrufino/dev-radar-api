const express = require('express'); //importando o modulo express
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes'); //importando as rotas
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://admin:admin@cluster0-un0hg.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use(cors());
app.use(express.json()); //falando pro express que ele precisa entender json
app.use(routes); //usando as rotas

server.listen(3333); //porta localhost
//app.listen(3333); //porta localhost



//Métodos HTTP: GET, POST, PUT, DELETE

//Tipos de parâmetros:

//Query Params: request.query(filtros, ordenação, paginação, ...)
//Route Params: request.params (Identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para criação ou alteração de um registro)

//MongoDB(Não-relacional)
