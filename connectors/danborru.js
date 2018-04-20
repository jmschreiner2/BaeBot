let request = require('sync-request');
let getRandomInt = require('../common').getRandomInt;

module.exports = {
    getPictureUrl: function (tag) {
        let data = JSON.parse(request('GET', `https://danbooru.donmai.us/posts.json?tags=${tag}&random=true&limit=1`).getBody('utf8'));

        return data[0].large_file_url;
    }
}