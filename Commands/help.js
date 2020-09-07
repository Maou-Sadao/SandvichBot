const Discord = require("discord.js");

module.exports = {
    name: 'help',
    description: "Prints a list of commands as a guide for users",
    run: async (message, args, userTag) => {
        message.channel.send('```Current Command List: \n1. s!price - Current price of MvM Tickets\n2. s!medic - Medic got that charge\n3. s!help - Commandception```');
        console.log(userTag+' Used the Help Command');
    }
}