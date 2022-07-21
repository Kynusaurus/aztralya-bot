const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const selectMenu = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('roles-menu')
            .setPlaceholder('Choisir un rôle dans la liste')
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions([
                {
                    label: 'Police',
                    description: 'Choisir le rôle police',
                    value: '992423678585344041'
                },
                {
                    label: 'Medical',
                    description: 'Choisir le rôle Medical',
                    value: '992423179077292132'
                }
            ])
    )

module.exports = {
    name: 'roles',
    category: 'staff',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'roles',
    examples: ['roles'],
    description: 'La commande roles.',
    async run(client, message, args) {
        await message.channel.send({ content: 'Choisir un rôle', components: [selectMenu] });
     },
    async runInteraction(client, interaction) { 
        await interaction.reply({ content: 'Choisir un rôle', components: [selectMenu] });
    },
};