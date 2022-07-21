module.exports = {
    name: 'unmute',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'unmute [@member]',
    examples: ['unmute @Aztralya'],
    description: 'La commande unmute permet de untimeout un membre.',
    async run(client, message, args) {
        if (!args[0]) return message.reply('Spécifiez un membre à untimeout.');

        const target = message.mentions.members.find(m => m.id);


        if (!target.isCommunicationDisabled()) return message.reply('Ce membre ne peut pas être untimeout par azRobot car il n\'est pas timeout.');

        target.timeout(null);
        message.channel.send(`Le membre ${target} est untimeout.`);
    },
    options: [
        {
            name: 'target',
            description: 'Le membre à timeout',
            type: 'USER',
            required: true
        }
    ],
    async runInteraction(client, interaction) {
        const target = interaction.options.getMember('target');

        if (!target.isCommunicationDisabled()) return interaction.reply('Ce membre ne peut pas être untimeout par azRobot car il n\'est pas timeout.');

        target.timeout(null);
        interaction.reply(`Le membre ${target} est untimeout.`);
    }
};