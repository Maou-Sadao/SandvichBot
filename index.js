const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    
    client.commands.set(command.name, command);
    console.log(`${file} loaded!`)
}

const prefix = 's!';

client.once('ready', () => {
    console.log('Sandvich is available in the fridge');
    //client.channels.cache.get('745807346927927316').send('The Sandvich is available in the Fridge. Commands will be accepted. \n ```Prefix: s!```')
});

client.on('message', async message => {
   if (!message.content.startsWith(prefix) || message.author.bot) return; 
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const userTag = message.member.user.tag
    
    switch(command) {
    
        case 'help':
            message.channel.send('```Current Command List: \n1. s!price - Current price of MvM Tickets\n2. s!medic - Medic got that charge\n3. s!help - Commandception\n4. s!meme - Pulls random meme image from one of 2 TF2 Shitposting subreddits```');
            console.log(userTag+' Used the Help Command');
            break;
            
        case 'medic':
            message.channel.send("I am ready to charge!<@"+message.author.id+'>', {files: ["https://i.redd.it/ye0lpakxutz01.jpg"]});
            break;
            
        default:    
            if (client.commands.has(command)) {
                try { client.commands.get(command).run(message, args, userTag); } 
                catch (error) {
                    console.error(error);
                    message.reply("Big F on that command");
                }
            }
            else {
                message.channel.send('Sandvich rotten, type better command');
                console.log(userTag+" can't type.")
            }
    }
});

//var rule = new schedule.RecurrenceRule();
//rule.hour = 21;
//rule.minute = 20;

client.login('');