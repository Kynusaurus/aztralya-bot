const transcript = require("discord-html-transcripts");

module.exports = {
    name: 'archive-ticket-button',
    async runInteraction(client, interaction) {
        const fetchGuild = await client.getGuild(interaction.guild);

        if(interaction.customId === "archive-ticket-button") {
            const ticketChannel = client.channels.cache.get(fetchGuild.ticketChannel);
            await interaction.deferReply()
            ticketChannel.send(( { content: `Récapitulatif HTML de ${interaction.message.embeds[0].description.split(" ")[0]}`, files: [await transcript.createTranscript(interaction.channel)] }));
            await interaction.editReply({content: "Le ticket a bien été archivé par mes soins.", ephemeral: true})
        }
    },
};
