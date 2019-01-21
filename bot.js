const Discord = require("discord.js");
const client = new Discord.Client();
const auth = require("./auth.json");
const connectorManager = require('./connectorManager');
const commandMap = require('./commandMap');

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {
    try {
        let content = message.content.toLowerCase();

        if(content.charAt(0) != '!'){
            return;
        }

        const parts = content.split(' ');
        const command = parts.splice(0, 1)[0].substr(1);
        const isNsfw = message.channel.nsfw;

        const api = isNsfw ? connectorManager.getRandomNsfw() : connectorManager.getRandomSfw();

        getPicture = commandMap[command];

        if(!getPicture)
            return;
        
        message.channel.send(getPicture(parts, api, isNsfw));
    }
    catch (e) {
        message.channel.send('Sorry Senpai! I am tired, nyow.');
        console.log(e);
    }
});

client.login(auth.token);