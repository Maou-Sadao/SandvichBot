const Discord = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: 'meme',
    description: "Generate a meme from the TF2 memes Subreddit",
    run: async (message, args, userTag) => {
        const subReddit = ["tf2shitposterclub", "tf2memes"];
        const REEE = subReddit[Math.floor(Math.random() * subReddit.length)];
        const event = randomPuppy(REEE).then(url => {
        
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(url)
                .setTitle(`From /r/${REEE}`)
                .setURL(`https://reddit.com/r/${REEE})`);
            message.channel.send(embed);
        });
        console.log(userTag+' Used the meme command');
    }
}