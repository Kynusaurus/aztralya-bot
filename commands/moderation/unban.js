const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'unban',
  category: 'moderation',
  permissions: ['BAN_MEMBERS'],
  ownerOnly: false,
  usage: 'unban [@member_id]',
  examples: ['unban @'],
  description: 'La commande unban permet de débannir un membre via son ID.',
  async run(client, message, args) {

    if (!args[0]) return message.reply('**Please specify a banned user ID!**')

    if (!message.member.permissions.has('BAN_MEMBERS')) { //if you (user) don't have ban member permission then
      const unbanError = new MessageEmbed()
        .setDescription('**You don\'t have permissions to unban members!**')
      return message.channel.send({ embeds: [unbanError] }) //return this embed

    } else if (!message.guild.me.permissions.has('BAN_MEMBERS')) { //if bot don't have ban member permission then
      const unbanError1 = new MessageEmbed()
        .setDescription('**I don\'t have permissions to unban members!**')
      return message.channel.send({ embeds: [unbanError1] }) //return this embed
    }

    try {
      let user = await message.guild.members.unban(args[0]) //unban the user. Finding the user by the User ID you given in argument 0
      let unbanSuccess = new MessageEmbed()
        .setTitle(`${user.tag} was unbanned\nby ${message.author.tag}`)
      return message.channel.send({ embeds: [unbanSuccess] })
    } catch {
      let errorEmbed = new MessageEmbed()
        .setDescription(":x: **I couldn't unban the user or the user is not banned**")
      return message.channel.send({ embeds: [errorEmbed] })
    }

  },
  options: [
    {
      name: "memberid",
      description: "L'id de l'utilisateur à déban",
      type: "STRING",
      required: true,
    }
  ],
  async runInteraction(client, interaction) {
    const member = interaction.options.getString("memberid");
    const logChannel = client.channels.cache.get('991456084676055050');

    if (!member)
      return interaction.reply({
        content: "L'id du membre n'a pas été trouvé.",
        ephemeral: true,
      });
    const embed = new MessageEmbed()
      .setAuthor({
        name: `${interaction.member.displayName} (${interaction.member.id})`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setColor('#4F2CDA')
      .setDescription(
        `**Membre**: \`${member}\`
         **Action**: Unban`
      )
      .setTimestamp();

    await interaction.reply({
      content: `Le membre ${member} a été débanni.`,
      ephemeral: true,
    });
    await logChannel.send({ embeds: [embed] });
    await interaction.guild.members.unban(member);
  },
};