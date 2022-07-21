const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
let config = require('../../config.json');

module.exports = {
    name: 'ticket-button',
    async runInteraction(client, interaction) {
        if(interaction.customId === "ticket-button") {

            const channel = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, {type: "GUILD_TEXT"})
            await channel.setParent(interaction.channel.parentId)

            await channel.permissionOverwrites.create(interaction.user, {
                SEND_MESSAGES: true,
                EMBED_LINKS: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true
            })
            await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                SEND_MESSAGES: false,
                EMBED_LINKS: false,
                VIEW_CHANNEL: false,
                READ_MESSAGE_HISTORY: false
            })

            await interaction.reply({content: `Votre ticket a été créé avec succès ${channel} !`, ephemeral: true})
            
            const Embed = new MessageEmbed()
            .setTitle(`Oh ! Un nouveau ticket est apparu !`)
            .setColor('#4F2CDA')
            .setDescription(`${interaction.user.tag} a créé ce ticket, répondez-lui dès que possible ! \n Quelqu'un du <@&992076481381543997> peut aider cette âme en détresse, s'il vous plaît ?!`)
            .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setFooter({ text: 'azRobot', iconURL: `${config.SERVER_LOGO}` });

            const btn = new MessageActionRow().addComponents(new MessageButton()
            .setStyle("DANGER")
            .setEmoji("🔒")
            .setLabel("Fermer le ticket")
            .setCustomId("close-ticket-button"),
            new MessageButton()
            .setStyle("PRIMARY")
            .setEmoji("📑")
            .setLabel("Archiver le ticket")
            .setCustomId("archive-ticket-button"))

            await channel.send({embeds: [Embed], components: [btn]})
        }
    },
};
