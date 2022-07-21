module.exports = {
  name: 'clear',
  category: 'moderation',
  permissions: ['MANAGE_MESSAGES'],
  ownerOnly: false,
  usage: 'clear [amount] <@target>',
  examples: ['clear 50', 'clear 50 @Aztralya'],
  description: 'La commande clear permet de supprimer un nombre de message spécifié sur un salon ou un utilisateur.',
  async run(client, message, args) {
    const amountToDelete = args[0];
    if (isNaN(amountToDelete) || !args[0] ||amountToDelete > 100 || amountToDelete < 2) return message.reply('Le \`nombre`\ doit être supérieur à 1 et inférieur à 100. ')
    const target = message.mentions.users.find(u => u.id);

    const messagesToDelete = await message.channel.messages.fetch();

    if (target) {
      let i = 0;
      const filteredTargetMessages = [];
      (await messagesToDelete).filter(msg => {
        if (msg.author.id == target.id && amountToDelete > i) {
          filteredTargetMessages.push(msg); i++;
        }
      });

      await message.channel.bulkDelete(filteredTargetMessages, true).then(messages => {
        message.channel.send(`J'ai supprimé ${messages.size} message de lutilisateur ${target}.`);
      });
    } else {
      await message.channel.bulkDelete(amountToDelete, true).then(messages => {
        message.channel.send(`J'ai supprimé ${messages.size} message sur ce salon.`);
      });
    }
  },
  options: [
    {
      name: 'message',
      description: 'Le nombre de message à supprimer',
      type: 'NUMBER',
      required: true
    },
    {
      name: 'target',
      description: 'Sélectionner l\'utilisateur pour la suppression de message ciblé',
      type: 'USER',
      required: false
    }
  ],
  async runInteraction(client, interaction) {
    const amountToDelete = interaction.options.getNumber("message");
    const target = interaction.options.getMember("target");

    const messagesToDelete = await interaction.channel.messages.fetch();

    if (target) {
      let i = 0;
      const filteredTargetMessages = [];
      (await messagesToDelete).filter((msg) => {
        if (msg.author.id == target.id && amountToDelete > i) {
          filteredTargetMessages.push(msg);
          i++;
        }
      });

      await interaction.channel
        .bulkDelete(filteredTargetMessages, true)
        .then((messages) => {
          interaction.reply({
            content: `J'ai supprimé ${messages.size} messages de l'utilisateur ${target}.`,
            ephemeral: true,
          });
        });
    } else {
      await interaction.channel
        .bulkDelete(amountToDelete, true)
        .then((messages) => {
          interaction.reply({
            content: `J'ai supprimé ${messages.size} messages sur ce salon.`,
            ephemeral: true,
          });
        });
    }
  },
};
