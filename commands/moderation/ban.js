module.exports = {
    name: 'ban',
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'ban [@member] [reason]',
    examples: ['ban @Aztralya Tu est nul.'],
    description: 'La commande ban permet de banir un membre avec une raison.',
    async run(client, message, args) {
        if (!args[0]) return message.reply('Spécifier un membre à bannir.')
        if (!args[1]) return message.reply('Spécifier la raison du bannissement.')

        const target = message.mentions.members.find(m => m.id);
        const reason = args.slice(1).join(' ');

        if (!target.bannable) return message.reply('Ce membre ne peut pas être banni par azRobot.');

        target.ban({ reason });
        message.channel.send(`Le membre ${target} à été banni du serveur.`)
    },
    options: [
        {
            name: 'target',
            description: 'Le membre à bannir',
            type: 'USER',
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
        const reason = interaction.options.getString('reason');

        if (!target.bannable) return interaction.reply('Ce membre ne peut pas être banni par azRobot.');

        target.ban({ reason });
        interaction.reply(`Le membre ${target} à été banni du serveur.`)
    }
};