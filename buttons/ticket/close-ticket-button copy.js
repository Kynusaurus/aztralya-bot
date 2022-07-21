module.exports = {
    name: 'close-ticket-button',
    async runInteraction(client, interaction) {
      
        if(interaction.customId === "close-ticket-button") {

            const user = interaction.guild.members.cache.find(m => m.user.username === interaction.message.embeds[0].description.split(" ")[0].split("#")[0] && m.user.discriminator === interaction.message.embeds[0].description.split(" ")[0].split("#")[1]).user;
            try {await user.send(`Votre ticket a été supprimé par ${interaction.user.tag}`)} catch (err) {}
            await interaction.channel.delete()
        }
    },
};
