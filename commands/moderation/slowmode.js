module.exports = {
  name: 'slowmode',
  category: 'moderation',
  permissions: ['MANAGE_MESSAGES'],
  ownerOnly: false,
  usage: 'slowmode [amount_in_second]',
  examples: ['slowmode 50', 'slowmode 15'],
  description: 'La commande slowmode permet de générer un mode lent sur le salon.',
  async run(client, message, args) {
    const value = args[0];
    if (isNaN(value) || !args[0]) return message.reply('Merci d\'indiquer un \`NOMBRE\` pour indiquer la durée du slowmode. ');

    if (value == 0) {
      await message.channel.setRateLimitPerUser(0)
      return message.reply({ content: 'Le slowmode est désactivé.'});
    } else {
      await message.channel.setRateLimitPerUser(value)
      return message.reply({ content: `Le slowmode est activé. -> \`${value}s\`` });
    }
  },
  options: [
    {
      name: 'value',
      description: 'Choisir la valeur du slowmode',
      type: 'NUMBER',
      required: true
    },
  ],
  async runInteraction(client, interaction) {
    const value = interaction.options.getNumber('value');

    if (value == 0) {
      await interaction.channel.setRateLimitPerUser(0)
      return interaction.reply({ content: 'Le slowmode est désactivé.', ephemeral: true });
    } else {
      await interaction.channel.setRateLimitPerUser(value)
      return interaction.reply({ content: `Le slowmode est activé. -> \`${value}s\``, ephemeral: true });
    }
  },
};
