const { MessageEmbed } = require('discord.js');
module.exports = {
      name: 'ping',
      usage: 'ping',
      aliases: ["p"],
      description: "Obtient la latence actuelle du Bot et la latence de l'API.",
      run: async(client, message, prefix) => {
        if(!message.content.startsWith(prefix)) return;
              try {
              const embed = new MessageEmbed()
              .setDescription('`Pinging...`')
              .setColor("#e67e22");    
              const msg = await message.channel.send({ embeds: [embed] });
              const timestamp = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp;
              const latency = `\`\`\`ini\n[ ${Math.floor(msg.createdTimestamp - timestamp)}ms ]\`\`\``;
              const apiLatency = `\`\`\`ini\n[ ${Math.round(message.client.ws.ping)}ms ]\`\`\``;
              embed.setTitle(`Pong!`)
              .setDescription('')
              .addField(`${client.emoji.success} Latence`, latency, true)
              .addField(`${client.emoji.success} API Latence`, apiLatency, true)
              .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
              .setTimestamp();
              msg.edit({ embeds: [embed] });
              
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
};