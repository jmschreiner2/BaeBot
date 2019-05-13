let request = require('sync-request');
let getRandomInt = require('../common').getRandomInt;

const PAGE_SIZE = 42

module.exports = {
    getPictureUrl: function (tag) {
        let tagName = undefined;
        let fileCount = undefined;

        if (tag == ''){
            const tagLookup = JSON.parse(request('GET', `https://lolibooru.ch/api/files?page=1`).getBody('utf8'));
            fileCount = tagLookup.fileCount;
        }
        else{
            const tagLookup = JSON.parse(request('GET', `https://lolibooru.ch/api/tags?contains=${tag}&page=1&sort=files&direction=desc`).getBody('utf8'));

            if(tagLookup.tags.length == 0){
                return -1
            }
    
            tagName = tagLookup.tags[0].name;
            fileCount = tagLookup.tags[0].fileCount;
        }

        const tar = getRandomInt(fileCount);
        
        const page = Math.ceil(tar / PAGE_SIZE);
        const file = tar % PAGE_SIZE;

        let data = JSON.parse(request('GET', `https://lolibooru.ch/api/files?${tagName !== undefined ? `tags[0]=${tagName}&` : ''}page=${page}`).getBody('utf8'));

        return data.files[file].mediaUrl;
    }
}