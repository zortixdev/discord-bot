const { MessageEmbed }= require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');

module.exports = {
        name: "botinfo",
        aliases: ['stats'],
        description: "Affiche les statistiques du bot",
        run: async (client, message, args, prefix) => {
        if(!message.content.startsWith(prefix)) return;
        try{
        const d = moment.duration(message.client.uptime);
        const days = (d.days() == 1) ? `${d.days()} jours` : `${d.days()} jours`;
        const hours = (d.hours() == 1) ? `${d.hours()} heures` : `${d.hours()} heures`;
        const clientStats = stripIndent`
          Serveurs   :: ${message.client.guilds.cache.size}
          Membres     :: ${message.client.users.cache.size}
          Channels  :: ${message.client.channels.cache.size}
          WS Ping   :: ${Math.round(message.client.ws.ping)}ms
          Uptime    :: ${days} et ${hours}
          Prefix    :: ${prefix}
       `;
        const { totalMemMb, usedMemMb } = await mem.info();
        const serverStats = stripIndent`
          OS        :: ${await os.oos()}
          Cores     :: ${cpu.count()}
          CPU Usage :: ${await cpu.usage()} %
          RAM       :: ${totalMemMb} MB
          RAM Usage :: ${usedMemMb} MB
        `;
    
        const embed = new MessageEmbed()
        .setTitle('Statistiques du Bot')
        .addField('Commandes', `\`${message.client.commands.size}\` commandes`, true)
        .addField('Aliases', `\`${message.client.aliases.size}\` aliases`, true)
        .addField('Client', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .addField('Server', `\`\`\`asciidoc\n${serverStats}\`\`\``)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
        message.channel.send({ embeds: [embed] });
        
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