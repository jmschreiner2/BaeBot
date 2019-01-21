'use strict';
const snoowrap = require('snoowrap');
const auth = require('../auth.json');
const config = require('../config.json');
const reddit = new snoowrap({
    userAgent: auth.reddit.userAgent,
    clientId: auth.reddit.clientId,
    clientSecret: auth.reddit.clientSecret,
    username: auth.reddit.username,
    password: auth.reddit.password
});
reddit.config({proxies: false});
const getRandomInt = require('../common').getRandomInt;

const getPosts = async (subList) => 
{
    let randomSub = '';
    if(typeof subList == typeof []){
        randomSub = subList[getRandomInt(subList.length)];
    }
    else if(typeof subList == typeof ""){
        randomSub = subList;
    }
    else{
        return null;
    }

    return await reddit.getSubreddit(randomSub).getTop({time: 'month'});
}

const chooseRandomPicture = (postList) => {
    const viablePosts = postList.filter(post => {
        const split = post.url.split('.');
        const ext = split[split.length - 1];
        return config.pictureTypes.indexOf(ext) != -1;
    });

    return viablePosts[getRandomInt(viablePosts.length)];
}

module.exports = {
    getMeme: async () => {
        const posts = await getPosts(config.memeSubreddits);
        const post = chooseRandomPicture(posts);
        return {
            title: post.title,
            url: post.url
        };
    },
    getSubredditTopPost: async (subReddit) => {
        const posts = await getPosts(subReddit);
        const post = chooseRandomPicture(posts);
        return {
            title: post.title,
            url: post.url
        };
    }
}