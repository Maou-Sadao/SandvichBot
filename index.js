const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    
    client.commands.set(command.name, command);
    console.log(`${file} loaded!`)
}

const prefix = config.prefix;

client.once('ready', () => {  
    console.log('Sandvich is available in the fridge');
    client.channels.cache.get('745807346927927316').send('The Sandvich is available in the Fridge. Commands will be accepted. \n ```Prefix: s!```')
    //Currently only able to post start up messages in specific channels based on ID
});

client.on('message', async message => {
   if (!message.content.startsWith(prefix) || message.author.bot) return; 
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const userTag = message.member.user.tag //Collects user tag for console
       
    //Dynamically takes commands and searches from a list of command files
    if (client.commands.has(command)) { 
        try { 
            client.commands.get(command).run(message, args, userTag);
        } 
        catch (error) {
            console.error(error);
            message.reply("Big F on that command");
        }
    }
    else {
        message.channel.send('Sandvich rotten, type better command');
        console.log(userTag+" can't type.")
    }
});

client.login(config.token);