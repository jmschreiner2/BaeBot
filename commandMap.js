const getRandomReal = require('./connectorManager').getRandomReal;
const redditConnetor = require('./connectors/reddit');
const fs = require('fs');

const getFile = (name) => {
    return fs.readFileSync(`assets/${name}.png`);
}

const commandMap = {
    mm: (params, api, isNsfw) => {
        return 'https://j.gifs.com/KZyx5G.gif';
    },
    realasian: (params, api, isNsfw) => {
        if(isNsfw) {
            return getRandomReal().getPictureUrl('asian');
        }
        else{
            return 'Sorry Senpai! That is too lewd! I\'m embarassed, nyow.';
        }
    },
    real: (params, api, isNsfw) => {
        if(isNsfw) {
            return getRandomReal().getPictureUrl('');
        }
        else{
            return 'Sorry Senpai! That is too lewd! I\'m embarassed, nyow.';
        }
    },
    trap: (params, api, isNsfw) => {
        return api.getPictureUrl('trap');
    },
    tohsaka: (params, api, isNsfw) => {
        return api.getPictureUrl('tohsaka_rin');
    },
    jeanne: (params, api, isNsfw) => {
        return api.getPictureUrl('jeanne_d\'arc_(fate)_(all)');
    },
    kiara: (params, api, isNsfw) => {
        return api.getPictureUrl('sesshouin_kiara');
    },
    illya: (params, api, isNsfw) => {
        return api.getPictureUrl('illyasviel_von_einzbern');
    },
    tamamo: (params, api, isNsfw) => {
        return api.getPictureUrl('tamamo_(fate)_(all)');
    },
    bb: (params, api, isNsfw) => {
        return api.getPictureUrl('bb_(fate/extra_ccc)');
    },
    meltlilith: (params, api, isNsfw) => {
        return api.getPictureUrl('meltlilith');
    },
    scathach: (params, api, isNsfw) => {
        return api.getPictureUrl('scathach_(fate/grand_order)');
    },
    custom: (params, api, isNsfw) => {
        if(params.length == 0){
            return 'Please supply me something to search, nya!\n!custom <search text>'
        }
        return api.getPictureUrl(params[0]);
    },
    meme: async (params, api, isNsfw) => {
        const post = await redditConnetor.getMeme();
        return `${post.url} ${post.title}`;
    },
    deepfried: async (params, api, isNsfw) => {
        const post = await redditConnetor.getSubredditTopPost('DeepFriedMemes');
        return `${post.url} ${post.title}`;
    },
    spicymeme: async (params, api, isNsfw) => {
        const post = await redditConnetor.getSubredditTopPost('ImGoingToHellForThis');
        return `${post.url} ${post.title}`;
    },
    doot: (params, api, isNsfw) => {
        return getFile('doot');
    },
    gachi: (params, api, isNsfw) => {
        return getFile('gachi');
    },
    kappa: (params, api, isNsfw) => {
        return getFile('kappa');
    },
    help: (params, api, isNsfw) => {
        let output = '';

        for(var property in commandMap) {
            if(commandMap.hasOwnProperty(property)){
              output += ', !' + property;
          }
        }

        return `Hello Nyow!\nThese are the commands I nyow:\n${output.substr(2)}`;
    }
}

module.exports = commandMap;