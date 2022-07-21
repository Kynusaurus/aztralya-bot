const ms = require('ms');

module.exports = {
    name: 'mute',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'mute [@member] [duration] [reason]',
    examples: ['mute @Aztralya 4 minutes Tu est nul.'],
    description: 'La commande mute permet de timeout temporairement un membre avec une raison.',
    async run(client, message, args) {
        if (!args[0]) return message.reply('Spécifiez un membre à timeout.');
        if (!args[1] || !args[2]) return message.reply('Spécifiez une durée pour le timeout.');
        if (!args[3]) return message.reply('Spécifiez la raison du timeout.');

        const target = message.mentions.members.find(m => m.id);
        const duration = args.slice(1, 3).join(' ');
        const convertedTime = ms(duration);
        const reason = args.slice(3).join(' ');

        if (!target.moderatable) return message.reply('Ce membre ne peut pas être timeout par azRobot.');
        if (!convertedTime) return message.reply('Spécifiez une durée valable.')

        target.timeout(convertedTime, reason);
        message.channel.send(`Le membre ${target} est timeout pendant ${duration} car ${reason}.`);
    },
    options: [
        {
            name: 'target',
            description: 'Le membre à timeout',
            type: 'USER',
            required: true
        },
        {
            name: 'duration',
            description: 'La durée du timeout',
            type: 'STRING',
            required: true
        },
        {
            name: 'reason',
            description: 'La raison du timeout',
            type: 'STRING',
            required: true
        }
    ],
    async runInteraction(client, interaction) {
        const target = interaction.options.getMember('target');
        const duration = interaction.options.getString('duration');
        const convertedTime = ms(duration);
        const reason = interaction.options.getString('reason');

        if (!target.moderatable) return interaction.reply('Ce membre ne peut pas être timeout par azRobot.');
        if (!convertedTime) return interaction.reply('Spécifiez une durée valable.')

        target.timeout(convertedTime, reason);
        interaction.reply(`Le membre ${target} est timeout pendant ${duration} car ${reason}.`);
    }
};