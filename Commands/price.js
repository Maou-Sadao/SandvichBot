const axios = require('axios');
const parse = require('node-html-parser').parse
const Discord = require("discord.js");

module.exports = {
    name: 'price',
    description: "Scraps the current price of MvM Tour of Duty Tickets from MarketPlace.tf",
    run: async (message, args, userTag) => {
        axios
        .get('https://marketplace.tf/items/tf2/725;6;uncraftable')
            .then((response) => {
                const root = parse(response.data);
                var price = root.querySelector('.current-bid-amount').rawText;
                
                const priceEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Uncraftable Tour of Duty Ticket')
                    .setURL('https://marketplace.tf/items/tf2/725;6;uncraftable')
                    .setDescription('Present this ticket in Mann vs. Machine to play Mann Up Mode on an official server to earn rare items and track progress on your Tour of Duty Badge.')
                    .addFields(
                    { name: 'Price', value: price})
                    .setImage('https://steamcdn-a.akamaihd.net/apps/440/icons/mvm_ticket_large.c5057154f4fc93c0f5c667f69a988971b19bb95f.png')
                    .setTimestamp();
                message.channel.send(priceEmbed);
            })
        .catch((error) => {
            console.error(error)
            message.channel.send('The price could not be stolen')
    });
        console.log(userTag+' Used the Price command');
    }
}