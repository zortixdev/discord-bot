const db = require('quick.db');
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'autorole-check',
    aliases: ["arc"],
    description: "vérifie l'autorole actuel",
    run: async(client, message, args, prefix) => {
        if(!message.content.startsWith(prefix)) return;
        try{
        const check = await db.has(`autorole-${message.guild.id}`);
        if(check === false) return message.reply('> Il n\'y a pas d\'autorole !');
        const role = await db.get(`autorole-${message.guild.id}`);
        const embed = new MessageEmbed()
        .setTitle('Rôle automatique')
        .setDescription(`> L'autorole est <@&${role}>`)
        .setColor('#e67e22')
        message.reply({ embeds: [embed] });
        } catch (err) {
            const errorEmbed = new MessageEmbed()
            .setTitle("ERROR")
            .setDescription(`${client.emoji.fail} ${err.message}`)
            .setColor("#e67e22")
            .setFooter("Le message sera supprimé après 10 secondes");
            message.channel.send({embeds: [errorEmbed] }).then(e => {
                setTimeout(() => e.delete(), 10000);
            });
        }
    }
}