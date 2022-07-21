module.exports = {
    name: 'accept-button',
    async runInteraction(client, interaction) {
        await interaction.member.roles.add('992423922869997639');
        await interaction.member.roles.remove('998799218619732010');
        await interaction.reply({ content: 'Vous avez accepté les règles du serveur.', ephemeral: true
        });
    },
};
