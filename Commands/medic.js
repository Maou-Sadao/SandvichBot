const Discord = require("discord.js");

module.exports = {
    name: 'medic',
    description: '( ͡° ͜ʖ ͡°)',
    run: async (message, args, userTag) => {
        message.channel.send("I am ready to charge!<@"+message.author.id+'>', {files: ["https://i.redd.it/ye0lpakxutz01.jpg"]});
        console.log(userTag+' Called for the Medic');
    }
}