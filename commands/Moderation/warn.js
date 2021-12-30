const colors = require('./../../colors.json')
const db = require("quick.db");
const Discord = require('discord.js')

module.exports = {
  name: "warn",
  usage: "warn <@mention> <reason>",
  clientPerms: "ADMINISTRATOR",
  description: "Warn une personne qui ne respect pas le règlement",
  cooldown: 3,
  run: async (client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return;

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        "```S'il te plaît mentionne la personne que tu veux warn - warn @mention <reaosn>```"
      );
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("```Tu ne peux pas warn un bot```");
    }

    if (message.author.id === user.id) {
      return message.channel.send("```Tu ne peux pas t'auto-warn```");
    }

    const reason = args.slice(1).join(" ");

    if (!reason) {
      return message.channel.send(
        "```S'il te plaît donne moi une raison du warn - warn @mention <reason>```"
      );
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1);
      user.send(
        `Tu as été warn dans **${message.guild.name}** car tu as ${reason}`
      );
      await message.channel.send(
        `Tu as warn **${
          message.mentions.users.first().username
        }** car il a ${reason}`
      );
    } else if(warnings !== null) {
      
      db.add(`warnings_${message.guild.id}_${user.id}`, 1);
      
      user.send(`Tu as été warn dans **${message.guild.name}** car tu as ${reason}`);
      
      await message.channel.send(`Tu as warn **${message.mentions.users.first().username}** car il a ${reason}`);
      
      message.delete
      
    }
  }
};