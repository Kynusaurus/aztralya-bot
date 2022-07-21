module.exports = {
    name: 'softban',
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'softban [@member] [duration] [reason]',
    examples: ['softban @Aztralya 4 Tu est nul.'],
    description: 'La commande softban permet de bannir temporairement un membre avec une raison.',
    async run(client, message, args) {
        if (!args[0]) return message.reply('Spécifiez un membre à bannir.');
        if (isNaN(args[1]) || !args[1] || args[1] > 7 || args[1] < 1) return message.reply('Spécifiez une durée pour le bannissement **entre 1 et 7 jours**.');
        if (!args[2]) return message.reply('Spécifiez la raison du bannissement.');

        const target = message.mentions.members.find(m => m.id);
        const duration = args[1];
        const reason = args.slice(2).join(' ');

        if (!target.bannable) return message.reply('Ce membre ne peut pas être banni par azRobot.');

        target.ban({ days: duration, reason: reason });
        message.channel.send(`Le membre ${target} est banni pendant ${duration} jour(s).`);
    },
    options: [
        {
            name: 'target',
            description: 'Le membre à bannir',
            type: 'USER',
            required: true
        },
        {
            name: 'duration',
            description: 'La durée du bannissement',
            type: 'NUMBER',
            minValue: 1,
            maxValue: 7,
            required: true
        },
        {
            name: 'reason',
            description: 'La raison du bannissement',
            type: 'STRING',
            required: true
        }
    ],
    async runInteraction(client, interaction) {
        const target = interaction.options.getMember('target');
        const duration = interaction.options.getNumber('duration');
        const reason = interaction.options.getString('reason');

        if (!target.bannable) return interaction.reply('Ce membre ne peut pas être banni par azRobot.');

        target.ban({ days: duration, reason: reason });
        interaction.reply(`Le membre ${target} est banni pendant ${duration} jour(s).`);
    }
};