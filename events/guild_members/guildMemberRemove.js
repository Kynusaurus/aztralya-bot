const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    once: false,
    async execute(client, member) {
        const fetchGuild = await client.getGuild(member.guild);
        const fetchKickLog = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_KICK'
        });

        const kickLog = fetchKickLog.entries.first();
        const { target, reason } = kickLog;
        let isMemberKick = false;

        if (target.id === member.id) isMemberKick = true;

        const embed =  new MessageEmbed()
        .setAuthor({ name: `${member.user.tag}`, iconURL: member.user.displayAvatarURL() })
        .setColor('#4F2CDA')
        .setDescription(`· Nom d'utilisatteur : ${member.displayName}
        · ID : ${member.id}
        · Créé le : <t:${parseInt(member.user.createdTimestamp / 1000 )}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
        · Rejoint le : <t:${parseInt(member.joinedTimestamp / 1000 )}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
        · Quitté le : <t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000 )}:R>)
        · Kick ? : ${isMemberKick ? `**Oui -> ${reason}**` : '**Non.**'}
        `)
        .setTimestamp()
        .setFooter({ text: 'azRobot', iconURL: `${config.SERVER_LOGO}` });

        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        logChannel.send({ embeds: [embed] });
    },
};