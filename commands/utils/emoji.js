module.exports = {
    name: 'emoji',
    category: 'utils',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'emoji []',
    examples: ['emoji'],
    description: 'La commande emoji permet de poster des émojis.',
    async run(client, message, args) {
        const poll = await message.reply('Emoji');
      await poll.react('🟩');
      await poll.react('🟥');
      await poll.react('🟦');
    },

    async runInteraction(client, interaction) {
        const poll = await interaction.reply({ content: 'Emoji', fetchReply: true })
      await poll.react('🟩');
      await poll.react('🟥');
      await poll.react('🟦');
    },
};