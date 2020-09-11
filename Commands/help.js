const Discord = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Outputs a list of commands',
    run: async (message, args, userTag) => {
        message.channel.send('```Current Command List: \n1. s!price - Current price of MvM Tickets\n2. s!medic - Medic got that charge\n3. s!help - Commandception\n4. s!meme - Pulls random meme image from one of 2 TF2 Shitposting subreddits\n5. s!hang - Plays a simple game of hangspy (hangman spoof)```');
        console.log(userTag+' Used the Help Command');
    }
    
}