const { Util, MessageEmbed, Permissions } = require("discord.js");
const { parse } = require("twemoji-parser");
const Color = "#e67e22";

module.exports = {
  name: "addemoji",
  aliases: ["ae"],
  description: "Ajoute des emojis au serveur",
  clientPerms: ["MANAGE_EMOJIS_AND_STICKERS"],
  userPerms: ["MANAGE_EMOJIS_AND_STICKERS"],
  usage: "<emojiname> or <link>",
  run: async(client, message,args, prefix) => {
      try{
          if(!message.content.startsWith(prefix)) return;
          const emoji = args[0];
          if(!emoji) return message.channel.send(`**S'il vous plaît donnez-moi un emoji à ajouter**`);
          let customemoji = Util.parseEmoji(emoji);
          if(customemoji.id) {
              const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"}`;
              const name = args.slice(1).join(" ");
              message.guild.emojis.create(
                  `${Link}`,
                  `${name || `${customemoji.name}`}`
                  );
                  const Added = new MessageEmbed()
                  .setColor(Color)
                  .setDescription(`${client.emoji.success} Emoji a été ajouté !n\name: ${name || `${customemoji.name}`}\nAperçu: [Click Me](${Link})`);
                  return message.channel.send({ embeds: [Added] });
          } else {
              let CheckEmoji = parse(emoji, { assetType: "png" });
              if (!CheckEmoji[0])
              return message.channel.send(`${client.emoji.fail} Veuillez me donner un emoji valide`);
              message.channel.send(`${client.emoji.fail} Vous pouvez utiliser des emoji normaux sans ajouter de serveur`);
          } 

      //ERROR CATCH
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