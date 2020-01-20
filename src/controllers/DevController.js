const axios = require('axios');
const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {

    /*
        index - Listar, 
        show - Listar 1, 
        store - Criar, 
        update - Alterar, 
        destroy - Deletar
    */

    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) { //acessando uma rota
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`); //requisição na api do github

            const { name = login, avatar_url, bio } = apiResponse.data; //se o name vier "vazio" ele recebe o login

            const techsArray = ParseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            const sendSocketMessageTo = findConnections({
                latitude,
                longitude,
            },
                techsArray,
            );

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return response.json(dev); //retorno da request
    }
};