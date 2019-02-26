const Discord = require("discord.js");
const client = new Discord.Client();
const auth = require("./auth.json");
const connectorManager = require('./connectorManager');
const commandMap = require('./commandMap');

const sendMessage = (response, channel) => {
    if(typeof response == typeof ''){
        channel.send(response);
    }
    else {
        channel.sendFile(response);
    }
}

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", async (message) => {
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
        
        response = await getPicture(parts, api, isNsfw);

        if(Array.isArray(response))
        {
            response.forEach(resp => {
                sendMessage(resp, message.channel);
            })
        }
        else
        {
            sendMessage(response, message);
        }
    }
    catch (e) {
        message.channel.send('Sorry Senpai! I am tired, nyow.');
        console.log(e);
    }
});

client.login(auth.token);