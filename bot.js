const { Client, Attachment, RichEmbed } = require("discord.js");
const client = new Client();
const auth = require("./auth.json");
const connectorManager = require('./connectorManager');
const commandMap = require('./commandMap');
const { STRING, ATTACHMENT, ARRAY, AUDIO } = require('./common.js');
const fs = require('fs');

const sendMessage = (body, type, channel, { message, name }, origMessage) => {
    if((type & STRING) > 0){
        channel.send(body);
    }
    else if ((type & ATTACHMENT) > 0) {
        let data = {};

        if(typeof body === typeof ''){
            const embed = new RichEmbed();

            embed.setURL(body);
            embed.setTitle('SAUCE');
            embed.setImage(body);

            data = { embed };
        }
        else {
            const attachment = new Attachment(body, name);

            data = { files: [ attachment ] };
        }

        channel.send(message, data);
    }
    else if ((type & AUDIO) > 0)
    {
        const voiceChannel = origMessage.member.voiceChannel;

        if(!voiceChannel){
            return;
        }


        voiceChannel.join()
            .then(connection => {
                const stream = fs.createReadStream(body);
                const dispatcher = connection.playStream(stream);
                dispatcher.on("finish", end => { setTimeout(() => voiceChannel.leave(), 1000); });
            })
            .catch(console.log);

    }
    else {
        channel.send("I don't know what to do nyaa.");
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

        if((response.type & ARRAY) > 0)
        {
            response.body.forEach(resp => {
                sendMessage(resp, response.type & ~ARRAY, message.channel, response, message);
            })
        }
        else
        {
            sendMessage(response.body, response.type, message.channel, response, message);
        }
    }
    catch (e) {
        message.channel.send('Sorry Senpai! I am tired, nyow.');
        console.log(e);
    }
});

client.login(auth.token);