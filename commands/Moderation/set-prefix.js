const {discord, Permissions} = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'set-prefix',
    aliases: ["sp"],
    description: "définir le préfixe selon le serveur",
    UserPerms: ["ADMINISTRATOR"],
    ClientPerms: ["ADMINISTRATOR"],
    run: async (client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return;
    try{
    const newprefix = args[0]
    if(!newprefix) return message.reply('> Entrez un nouveau Prefix')
    if(newprefix.length > 5) return message.channel.send("> Prefix invalide, le Prefix est trop long")
    message.channel.send(`> Nouveau Prefix défini sur **${newprefix}**`)
    db.set(`prefix_${message.guild.id}`, newprefix);
    } catch (err) {
      const errorEmbed = new MessageEmbed()
      .setTitle("ERREUR")
      .setDescription(`${client.emoji.fail} ${err.message}`)
      .setColor("#e67e22")
      .setFooter("Le message sera supprimé après 10 secondes");
      message.channel.send({embeds: [errorEmbed] }).then(e => {
        setTimeout(() => e.delete(), 10000);
      });
    }
  }
}