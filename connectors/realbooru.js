let request = require('sync-request');
let xml = require('xml2js');
let getRandomInt = require('../common').getRandomInt;

module.exports = {
    getPictureUrl: function (tag) {
        let data = '';
        let obj = null;
        let pages = 1000

        let post = getRandomInt(100);
        let page = getRandomInt(pages);

        data = request('GET', `http://realbooru.com/index.php?page=dapi&s=post&q=index&tags=${tag}&pid=${page}`);
        xml.parseString(data.getBody('utf8'), (err, result) =>{
            obj = result;
        });

        return obj.posts.post[post].$.file_url;
    }
}