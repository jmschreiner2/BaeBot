let request = require('sync-request');
let xml = require('xml2js');
let getRandomInt = require('../common').getRandomInt;

module.exports = {
    getPictureUrl: function (tag) {
        let data = request('GET', `https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=${tag}&limit=1`);
        let obj = null;
        xml.parseString(data.getBody('utf8'), (err, result) =>{
            obj = result;
        });

        let count = parseInt(obj.posts.$.count);
        let pages = parseInt(count / 100);
        let pageCount = Math.min(count, 100);

        let post = getRandomInt(pageCount);
        let page = getRandomInt(pages);

        data = request('GET', `http://safebooru.org/index.php?page=dapi&s=post&q=index&tags=${tag}&pid=${page}`);
        xml.parseString(data.getBody('utf8'), (err, result) =>{
            obj = result;
        });

        return `https:${obj.posts.post[post].$.file_url}`;
    }
}