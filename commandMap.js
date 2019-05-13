const getRandomReal = require('./connectorManager').getRandomReal;
const redditConnetor = require('./connectors/reddit');
const lolibooruConnector = require('./connectors/lolibooru')
const fs = require('fs');
const { getRandomInt, ATTACHMENT, STRING, ARRAY } = require('./common');

const getFile = (name, ext = 'png') => {
    return fs.readFileSync(`assets/${name}.${ext}`);
}

const nsfwError = {
    body: 'Sorry Senpai! That is too lewd! I\'m embarassed, nyow.',
    type: STRING
}

const commandMap = {
    mm: (params, api, isNsfw) => {
        return {
            body: getFile('mm', 'gif'),
            name: 'mm.gif',
            type: ATTACHMENT
        };
    },
    realasian: (params, api, isNsfw) => {
        if(isNsfw) {
            return {
                body: getRandomReal().getPictureUrl('asian'),
                type: ATTACHMENT
            };
        }
        else{
            return nsfwError;
        }
    },
    real: (params, api, isNsfw) => {
        if(isNsfw) {
            return {
                body: getRandomReal().getPictureUrl(''),
                type: ATTACHMENT
            }
        }
        else{
            return nsfwError;
        }
    },
    trap: (params, api, isNsfw) => {
        return {
            body: api.getPictureUrl('trap'),
            type: ATTACHMENT
        }
    },
    tohsaka: (params, api, isNsfw) => {
        return {
            body: api.getPictureUrl('tohsaka_rin'),
            type: ATTACHMENT
        };
    },
    jeanne: (params, api, isNsfw) => {
        return {
            body: api.getPictureUrl('jeanne_d\'arc_(fate)_(all)'),
            type: ATTACHMENT
        };
    },
    kiara: (params, api, isNsfw) => {
        return {
            body: api.getPictureUrl('sesshouin_kiara'),
            type: ATTACHMENT
        };
    },
    illya: (params, api, isNsfw) => {
        return {
            body: api.getPictureUrl('illyasviel_von_einzbern'),
            type: ATTACHMENT
        };
    },
    tamamo: (params, api, isNsfw) => {
        return {
            body: api.getPictureUrl('tamamo_(fate)_(all)'),
            type: ATTACHMENT
        };
    },
    bb: (params, api, isNsfw) => {
        return {
            body: api.getPictureUrl('bb_(fate/extra_ccc)'),
            type: ATTACHMENT
        };
    },
    meltlilith: (params, api, isNsfw) => {
        return {
            body: api.getPictureUrl('meltlilith'),
            type: ATTACHMENT
        };
    },
    scathach: (params, api, isNsfw) => {
        return {
            body: api.getPictureUrl('scathach_(fate/grand_order)'),
            type: ATTACHMENT
        };
    },
    custom: (params, api, isNsfw) => {
        if(params.length == 0){
            return {
                body: 'Please supply me something to search, nya!\n!custom <search text>',
                type: STRING
            };
        }
        return {
            body: api.getPictureUrl(params[0]),
            type: ATTACHMENT
        };
    },
    meme: async (params, api, isNsfw) => {
        const post = await redditConnetor.getMeme();
        return {
            body: post.url,
            message: post.title,
            type: ATTACHMENT
        };
    },
    deepfried: async (params, api, isNsfw) => {
        const post = await redditConnetor.getSubredditTopPost('DeepFriedMemes');
        return {
            body: post.url,
            message: post.title,
            type: ATTACHMENT
        };
    },
    spicymeme: async (params, api, isNsfw) => {
        const post = await redditConnetor.getSubredditTopPost('ImGoingToHellForThis');
        return {
            body: post.url,
            message: post.title,
            type: ATTACHMENT
        };
    },
    doot: (params, api, isNsfw) => {
        return { 
            body: getFile('doot'),
            name: 'doot.png',
            type: ATTACHMENT
        };
    },
    gachi: (params, api, isNsfw) => {
        return { 
            body: getFile('gachi'),
            name: 'gachi.png',
            type: ATTACHMENT 
        };
    },
    kappa: (params, api, isNsfw) => {
        return { 
            body: getFile('kappa'),
            name: 'kappa.png',
            type: ATTACHMENT
        };
    },
    dawae: (params, api, isNsfw) => {
        return { 
            body: '```⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠶⣿⣭⡧⡤⣤⣻⣛⣹⣿⣿⣿⣶⣄\n⢀⢀⢀⢀⢀⢀⢀⢀⢀⣼⣊⣤⣶⣷⣶⣧⣤⣽⣿⣿⣿⣿⣿⣿⣷\n⢀⢀⢀⢀⢀⢀⢀⢀⢀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇\n⢀⢀⢀⢀⢀⢀⢀⣠⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧\n⢀⢀⢀⢀⢀⢀⠸⠿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣻⣿⣿⣿⣿⣿⡆\n⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⡀⠘⣿⡿⢿⣿⣿⡟⣾⣿⣯⣽⣼⣿⣿⣿⣿⡀\n⢀⢀⢀⢀⢀⢀⡠⠚⢛⣛⣃⢄⡁⢀⢀⢀⠈⠁⠛⠛⠛⠛⠚⠻⣿⣿⣿⣷\n⢀⢀⣴⣶⣶⣶⣷⡄⠊⠉⢻⣟⠃⢀⢀⢀⢀⡠⠔⠒⢀⢀⢀⢀⢹⣿⣿⣿⣄⣀⣀⣀⣀⣀⣀\n⢠⣾⣿⣿⣿⣿⣿⣿⣿⣶⣄⣙⠻⠿⠶⠒⠁⢀⢀⣀⣤⣰⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄\n⢿⠟⠛⠋⣿⣿⣿⣿⣿⣿⣿⣟⡿⠷⣶⣶⣶⢶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄\n⢀⢀⢀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠉⠙⠻⠿⣿⣿⡿\n⢀⢀⢀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⢀⢀⢀⠈⠁\n⢀⢀⢀⢀⢸⣿⣿⣿⣿⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⢀⢀⢀⢀⢸⣿⣿⣿⣿⣄⠈⠛⠿⣿⣿⣿⣿⣿⣿⣿⡿⠟⣹⣿⣿⣿⣿⣿⣿⣿⣿⠇\n⢀⢀⢀⢀⢀⢻⣿⣿⣿⣿⣧⣀⢀⢀⠉⠛⠛⠋⠉⢀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⠏\n⢀⢀⢀⢀⢀⢀⢻⣿⣿⣿⣿⣿⣷⣤⣄⣀⣀⣤⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋\n⢀⢀⢀⢀⢀⢀⢀⠙⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠛\n⢀⢀⢀⢀⢀⢀⢀⢀⢀⢹⣿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠁\n⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⡇⢀⠈⠙⠛⠛⠛⠛⠛⠛⠻⣿⣿⣿⠇\n⢀⢀⢀⢀⢀⢀⢀⢀⢀⣸⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢨⣿⣿\n⢀⢀⢀⢀⢀⢀⢀⢀⣾⣿⡿⠃⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⡏\n⢀⢀⢀⢀⢀⢀⢀⢀⠻⠿⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢠⣿⣿⡇```',
            type: STRING
        };
    },
    dab: (params, api, isNsfw) => {
        let dabCount = 1;

        const even = getRandomInt(2);

        if(params !== undefined && params[0] !== undefined){
            dabCount = Math.min(params[0], 5);
        }

        const dab = getFile('dab');
        const reverse = getFile('dab_reverse');

        let ret = [];
        for(let i = 0; i < dabCount; i++){
            if(even && i % 2 === 0)
            {
                ret[i] = dab;
            }
            else if(!even && i%2 === 1)
            {
                ret[i] = dab;
            }
            else 
            {
                ret[i] = reverse;
            }
        }

        return {
            body: ret,
            name: 'dab.png',
            type: ATTACHMENT | ARRAY
        };
    },
    dabird: (params, api, isNsfw) => {
        return {
            body: getFile('dabird', 'gif'),
            name: 'dabird.gif',
            type: ATTACHMENT
        };
    },
    these: (params, api, isNsfw) => {
        return {
            body: getFile('psy'),
            name: 'these.png',
            type: ATTACHMENT
        };
    },
    fbi: (params, api, isNsfw) => {
        return {
            body: getFile('fbi', 'gif'),
            name: 'fbi.gif',
            type: ATTACHMENT
        };
    },
    edifier: (params, api, isNsfw) => {
        return {
            body: 'https://www.amazon.com/Swans-Speakers-Bluetooth-Bookshelf-Enclosure/dp/B07C1TVLDX',
            type: STRING
        }
    },
    loli: (params, api, isNsfw) => {
        if(isNsfw) {
            const rnd = getRandomInt(6);

            if(rnd === 1){
                return {
                    body: getFile('fbi', 'gif'),
                    name: 'fbi.gif',
                    type: ATTACHMENT
                };
            }

            const tag = params.length == 0 ? '' : params[0]

            const ret = lolibooruConnector.getPictureUrl(tag)

            return {
                body: ret,
                type: ATTACHMENT
            };
        }
        else{
            return nsfwError;
        }
    },
    help: (params, api, isNsfw) => {
        let output = '';

        for(var property in commandMap) {
            if(commandMap.hasOwnProperty(property)){
              output += ', !' + property;
          }
        }

        return {
            body: `Hello Nyow!\nThese are the commands I nyow:\n${output.substr(2)}`,
            type: STRING
        };
    }
}

module.exports = commandMap;