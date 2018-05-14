const Discord = require("discord.js");
const client = new Discord.Client();
const auth = require("./auth.json");
const getRandomInt = require('./common').getRandomInt;
const nsfw = [require("./connectors/rule34"), require('./connectors/danborru'), require('./connectors/gelbooru')];
const sfw = [require('./connectors/safebooru')]
const real = [require('./connectors/realbooru')]
const cosplay = [...real, ...nsfw]

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {
    try {
        let content = message.content.toLowerCase();

        if (content.startsWith('!mm')){
            message.channel.search('https://j.gifs.com/KZyx5G.gif');
        }

        if (content.startsWith('!real')) {
            if (!message.channel.nsfw) {
                message.channel.send('Sorry Senpai! That is too lewd! I\'m embarassed, nyow.');
                return;
            }
            message.channel.send(real[0].getPictureUrl(''))
            return;
        }

        if (content.startsWith('!realasian')) {
            if (!message.channel.nsfw) {
                message.channel.send('Sorry Senpai! That is too lewd! I\'m embarassed, nyow.');
                return;
            }
            message.channel.send(real[0].getPictureUrl('asian'))
            return;
        }

        if (content.startsWith('!cosplay')) {
            let apis = [];
            if (message.channel.nsfw) {
                apis = nsfw;
            }
            else {
                apis = sfw;
            }

            let apiNumber = getRandomInt(apis.length);

            message.channel.send(apis[apiNumber].getPictureUrl('cosplay'))
            return;
        }

        let apis = [];
        if (message.channel.nsfw) {
            apis = nsfw;
        }
        else {
            apis = sfw;
        }

        let apiNumber = getRandomInt(apis.length);

        if (content.startsWith("!trap")) {
            message.channel.send(apis[apiNumber].getPictureUrl('trap'));
        }

        if (content.startsWith("!tohsaka")) {
            message.channel.send(apis[apiNumber].getPictureUrl('tohsaka_rin'));
        }

        if (content.startsWith("!jeanne")) {
            message.channel.send(apis[apiNumber].getPictureUrl('jeanne_d\'arc_(fate)_(all)'));
        }

        if (content.startsWith("!kiara")) {
            message.channel.send(apis[apiNumber].getPictureUrl('sesshouin_kiara'));
        }

        if (content.startsWith("!illya")) {
            message.channel.send(apis[apiNumber].getPictureUrl('illyasviel_von_einzbern '));
        }

        if (content.startsWith("!tamamo")) {
            message.channel.send(apis[apiNumber].getPictureUrl('tamamo_(fate)_(all)'));
        }

        if (content.startsWith("!bb")) {
            message.channel.send(apis[apiNumber].getPictureUrl('bb_(fate/extra_ccc)'));
        }

        if (content.startsWith("!meltlilith")) {
            message.channel.send(apis[apiNumber].getPictureUrl('meltlilith'));
        }

        if (content.startsWith('!custom'))
        {
            var params = message.content.split(' ');
            message.channel.send(apis[apiNumber].getPictureUrl(params[1]));
        }

        if(content.startsWith('!scathach'))
        {
            message.channel.send(apis[apiNumber].getPictureUrl('scathach_(fate/grand_order)'));
        }

    }
    catch (e) {
        message.channel.send('Sorry Senpai! I am tired, nyow.');
    }
});

client.login(auth.token);