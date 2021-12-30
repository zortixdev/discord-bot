const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js")

module.exports = {
  name: 'reaction-roles',
  aliases: ['rroles'],
  description: "Obtenir des rôles de console de jeus",
  userPerms: ["ADMINISTRATOR"],
  run: async(client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return;
    const embed = new MessageEmbed()
    .setTitle("<:fleche:920771472258105454> __**Vérification Et Role Annonce**__")
    .setDescription("**Obtenez ou supprimez des rôles en cliquant sur les options indiquées dans le menu, après avoir cliqué sur le rôle sera supprimé, le bot enverra un message DM indiquant que vous avez ajouté/supprimé des rôles**")
    
    const row = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId('gamerole')
      .setPlaceholder('Sélectionnez pour ajouter/supprimer des rôles')
      .addOptions([
        {
          label: 'Role Vérifié ✅',
          description: "Séléctionnez pour ajouter/supprimer Role Vérifié ✅",
          value: '✅・Vérifié',
        },
        {
          label: 'Role Annonce 📢',
          description: "Séléctionnez pour ajouter/supprimer Role Annonce 📢",
          value: '📢・Notification',
        },
        ]),
      );
      await message.channel.send({ embeds: [embed], components: [row] });
  }
}