const Discord = require("discord.js")
let word = "Heavy is Dead";
 
module.exports = {
    name: 'hang',
    description: 'Plays a simple game of Hang Heavy (Hangman spoof)',
    run: async (message, args, userTag) => {
        console.log(`${userTag} used the hang option`)  
        //Game Variable
        let lives = 6;
        let indexes = [];
        
        //Word Variables
        word = word.toLowerCase();
        let letArr = word.split(""); 
        let botString = "";
        let botArr = [];
        const editedEmbed = new Discord.MessageEmbed()
        
        //Visual emote String creation (bit cancer js here)
        for (let i = letArr.length-1; i >= 0; i--) {
            if (letArr[i].match(/[a-z]/i)) {
                botArr[i] = "sandwich";
            }
            else {
                botArr[i] = "blue_square";
            }
        }
        botString = botArr.join("::");
        botString = `:${botString}:`;        
        
        //Replace Emote String After every correct guess
        function replaceVisualString (indexes, letter) {
            for (let j = botArr.length-1; j >=0; j--) {
                if (indexes.includes(j)) {
                    botArr[j] = `regional_indicator_${letter}`;
                }
            }
            let editedString = botArr.join("::");
            editedString = `:${editedString}:`;
            indexes.length = 0;
            return editedString
        }
        
        function winCondition(letArr) {
            let didUWin = true;
            for (let i = letArr.length-1; i >= 0; i--) {
                if (letArr[i].match(/[a-z]/i)) { didUWin = false; }
            }
            return didUWin;
        }
        
        /* Future stuff
        let menuEmbed = {
            color: "RANDOM",
            title: "Hang The Spy - Menu",
            description: "How do you want to play Hang the Spy"
        };
        */
        
        const aliveSpy = new Discord.MessageAttachment('./images/theSpy.jpg', 'theSpy.jpg');
        const aliventSpy = new Discord.MessageAttachment('./images/theDeadSpy.gif', 'theDeadSpy.gif')
       // Embed Creation and send
        let hangmanEmbed = {
            color: "RANDOM",
            title: "Hang The Spy - A hangman spoof",
            image: {url: "https://screenshots.gamebanana.com/img/ico/sprays/530-90_spyisadick.jpg"},
            description: "Will the Spy be Dead? Guess a letter to find out!",
            fields: [{ name: "YOUR WORD", value: botString, inline: false }] };
        message.channel.send({embed: hangmanEmbed}).then((m) => {
        
        
        //Detect Author ID to prevent others from playing the same hangman game - Then create a filter and collector
        let authorID = message.author.id;
        const filter = response => { return response.author.id === authorID; }
        const collector = message.channel.createMessageCollector(filter);
        
        //Turn on collector and collect letter 
        collector.on('collect', response => {
            response.delete();
            //User typed a proper single letter
            if (response.content.length == 1 && response.content.match(/[a-z]/i)) {
                //Proceed with the hangman algorithm
                let currentLetter = response.content.toLowerCase();
                if (letArr.includes(currentLetter)) {
                    for (let i = letArr.length-1; i >= 0; i--) {
                        if (letArr[i] === currentLetter) {
                            indexes.push(i);
                            letArr[i] = "";
                        }
                    }
                    //calls replaceVisualString on botString to update the emote string to reflect the guesses
                    botString = replaceVisualString(indexes, currentLetter);
                    //edit the current embed with the new botString
                    m.embeds[0].fields[0] = {name: "YOUR WORD", value: botString, inline: false};
                    m.edit(new Discord.MessageEmbed(m.embeds[0]))
                    if (winCondition(letArr) === true) {
                        message.reply(`YOU WIN!!! The Correct Word was "${word}"`).then(msg => {msg.delete({timeout: 10000})});
                        collector.stop();
                        m.delete({timeout: 10000});
                    }
                }
                else {
                    lives--;
                    if (lives === 0) {
                        message.reply("You lost, The Spy Hanged himself").then(msg => {msg.delete({timeout: 10000})}).catch(console.error);
                        m.embeds[0].image = {url: "https://thumbs.gfycat.com/FormalDisfiguredEeve-size_restricted.gif"};
                        m.edit(new Discord.MessageEmbed(m.embeds[0]));
                        collector.stop();
                        m.delete({timeout: 20000});
                    }
                }   
            }
            //User has typed an invalid character
            else {
                response.reply("Please type 1 letter").then(msg => { msg.delete({ timeout: 5000}); });
            }
            
            
        });
        
        });
        
     
    }
    
}