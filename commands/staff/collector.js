module.exports = {
    name: 'collector',
    category: 'staff',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'collector',
    examples: ['collector'],
    description: 'La commande collector.',
    async run(client, message, args) {
        const filter = (reaction, user) => {
            return reaction.emoji.name === '❌' && user.id === message.author.id;
        };

        await message.react('❌');

        const collector = message.createReactionCollector({ filter, time: 5000 });

        collector.on('collect', (reaction, user) => {
            message.channel.send(`${user.tag} a réagi avec ${reaction.emoji.name}`);
        });

        collector.on('end', collected => {
            if (collected.size == 1) message.channel.send('L\'auteur du message à réagi.');
            else message.channel.send('L\'auteur du message n\'a pas réagi.');
        })
    },
    async runInteraction(client, interaction) { 
        interaction.reply('Ecrivez le message \`discord\`.');
        const filter = msg => msg.content.includes('discord');
        const collector = interaction.channel.createMessageCollector({ filter, time: 5000 });

        collector.on('end', collected => {
            interaction.followUp(`${collected.size - 1} messages collectés.`);
        })
    },
};