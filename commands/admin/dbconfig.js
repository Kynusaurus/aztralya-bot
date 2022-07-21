module.exports = {
    name: 'dbconfig',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'dbconfig [key] <value>',
    examples: ['dbconfig prefix', 'dbconfig prefix ?'],
    description: 'La commande dbconfig permet de configurer les données de la bdd.',
    async run(client, message, args, guidSettings) {
        if (!args[0] || !args[0].match(/^(prefix|logChannel|bvnChannel)$/)) return message.reply('Merci d\'entrer une clé valide (`prefix`/`logChannel`, `bvnChannel`)');
        const value = args[1];

        if (args[0] == 'prefix') {
            if (value) {
                await client.updateGuild(message.guild, { prefix: value });
                return message.reply({ content: `Nouvelle valeur de préfix: ${value}` })
            }
            message.reply({ content: `Valeur de préfix: ${guidSettings.prefix}` });
        } else if (args[0] == 'logChannel') {
            if (value) {
                await client.updateGuild(message.guild, { logChannel: value });
                return message.reply({ content: `Nouvelle valeur de logChannel: ${value}` })
            }
            message.reply({ content: `Valeur de logChannel: ${guidSettings.logChannel}` });
        } else if (args[0] == 'bvnChannel') {
            if (value) {
                await client.updateGuild(message.guild, { bvnChannel: value });
                return message.reply({ content: `Nouvelle valeur de bvnChannel: ${value}` })
            }
            message.reply({ content: `Valeur de bvnChannel: ${guidSettings.bvnChannel}` });
        }
    },
    options: [
        {
            name: 'key',
            description: 'Choisir une clé à modifier ou afficher',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'prefix',
                    value: 'prefix'
                },
                {
                    name: 'logChannel',
                    value: 'logChannel'
                },
                {
                    name: 'bvnChannel',
                    value: 'bvnChannel'
                }
            ]
        },
        {
            name: 'value',
            description: 'Choisir la nouvelle valeur pour votre clé',
            type: 'STRING',
        }
    ],
    async runInteraction(client, interaction, guidSettings) {
        const key = interaction.options.getString('key');
        const value = interaction.options.getString('value');

        if (key == 'prefix') {
            if (value) {
                await client.updateGuild(interaction.guild, { prefix: value });
                return interaction.reply({ content: `Nouvelle valeur de préfix: ${value}` })
            }
            interaction.reply({ content: `Valeur de préfix: ${guidSettings.prefix}` });
        } else if (key == 'logChannel') {
            if (value) {
                await client.updateGuild(interaction.guild, { logChannel: value });
                return interaction.reply({ content: `Nouvelle valeur de logChannel: ${value}` })
            }
            interaction.reply({ content: `Valeur de logChannel: ${guidSettings.logChannel}` });
        } else if (key == 'bvnChannel') {
            if (value) {
                await client.updateGuild(interaction.guild, { bvnChannel: value });
                return interaction.reply({ content: `Nouvelle valeur de bvnChannel: ${value}` })
            }
            interaction.reply({ content: `Valeur de bvnChannel: ${guidSettings.bvnChannel}` });
        }
    },
};