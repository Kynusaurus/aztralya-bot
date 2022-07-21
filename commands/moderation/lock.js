module.exports = {
    name: 'lock',
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'lock',
    examples: ['lock'],
    description: 'La commande lock permet de vérouiller un salon.',
    async run(client, message, args) {
        await message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false });
        await message.reply({content: 'Le salon à bien été vérouillé.'});
    },
    async runInteraction(client, interaction) {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: false });
        await interaction.reply({content: 'Le salon à bien été vérouillé.', ephemeral: true});
    }
};