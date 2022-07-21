const { Guild } = require('../../models/index');

module.exports = {
    name: 'update',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'update',
    examples: ['update'],
    description: 'La commande update permet de mettre à jour les nouvelles données.',
    async run(client, message, args) {
        await Guild.updateMany({}, { '$set': {'bvnChannel': '908575676892856350'}, upsert: true });
        message.reply('Nouvelle donnée ajoutée.')
    },

    async runInteraction(client, interaction) {
        await Guild.updateMany({}, { '$set': {'bvnChannel': '908575676892856350'}, upsert: true });
        interaction.reply('Nouvelle donnée ajoutée.')
    },
};