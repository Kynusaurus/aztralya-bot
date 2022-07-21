module.exports = {
    name: 'accept2-button',
    async runInteraction(client, interaction) {
        await interaction.member.roles.add('998799218619732010');
        await interaction.member.roles.remove('992439608086384710');
        await interaction.reply({ content: 'Vous avez modifié votre identité.', ephemeral: true
        });
    },
};
