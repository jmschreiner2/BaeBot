const getRandomInt = require('./common').getRandomInt;
const nsfw = [require("./connectors/rule34"), require('./connectors/danborru'), require('./connectors/gelbooru')];
const sfw = [require('./connectors/safebooru')]
const real = [require('./connectors/realbooru')]

const pickRandomApi = (apis) => {
    return apis[getRandomInt(apis.length)];
}

module.exports = {
    getRandomNsfw: () => pickRandomApi(nsfw),
    getRandomSfw: () => pickRandomApi(sfw),
    getRandomReal: () => pickRandomApi(real)
}
