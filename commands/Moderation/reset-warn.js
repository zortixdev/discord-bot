const db = require("old-wio.db");
const colors = require('./../../colors.json')

module.exports = {
  name: "resetwarns",
  aliases: ["rwarns"],
  usage: "rwarns <@user>",
  clientPerms: "ADMINISTRATOR",
  description: "Enlève les warns d'un utilisateur",
  run: async (bot, message, args) => {
    
    
    const user = message.mentions.members.first() 
    
    if(!user) {
    return message.channel.send("<:stop:920395974881472524> Veuillez mentionner la personne dont vous souhaitez réinitialiser l'avertissement")
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send("<:stop:920395974881472524> Les bots ne sont pas autorisés à avoir des avertissements")
    }
    
    if(message.author.id === user.id) {
      return message.channel.send("<:stop:920395974881472524> Vous n'êtes pas autorisé à réinitialiser vos avertissements")
    }
    
    let warnings = await db.fetch(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === null) {
      return message.channel.send(`${message.mentions.users.first().username} n'a pas d'avertissements`)
    }
    
   await db.delete(`warnings_${message.guild.id}_${user.id}`);
    user.send(`Tous vos avertissements sont réinitialisés par ${message.author.username} à partir de ${message.guild.name}`)
    await message.channel.send(`Réinitialiser tous les avertissements de ${message.mentions.users.first().username}`)
    
  
    
}
}
