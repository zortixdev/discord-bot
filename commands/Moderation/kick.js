const { MessageEmbed } = require('discord.js');

module.exports = {
      name: 'kick',
      aliases: ["kk"],
      usage: 'kick <user mention/ID> [reason]',
      description: 'Expulse un membre de votre serveur.',
      clientPerms: ['SEND_MESSAGES', 'EMBED_LINKS', 'KICK_MEMBERS'],
      userPerms: ['KICK_MEMBERS'],
      run: async(client, message, args, prefix) => {
          if(!message.content.startsWith(prefix)) return;
          try{
          const member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
          if (!member)
          return message.channel.send(`${client.emoji.fail} Veuillez mentionner un utilisateur ou fournir un identifiant d'utilisateur valide`);
          if (member === message.member)
          return message.channel.send(`${client.emoji.fail} Vous ne pouvez pas vous expulsez`);
          if (member.roles.highest.position >= message.member.roles.highest.position)
          return message.channel.send(`${client.emoji.fail} Vous ne pouvez pas expulser quelqu'un avec un rôle égal ou supérieur`);
          if (!member.kickable)
          return message.channel.send(`${client.emoji.fail} À condition que le membre ne soit pas kickable`);
          let reason = args.slice(1).join(' ');
          if (!reason) reason = '`Rien`';
          if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
          await member.kick(reason);
          const embed = new MessageEmbed()
          .setTitle('Membre Kick')
          .setDescription(`${client.emoji.success} ${member} a été botté avec succès.`)
          .addField('Modérateur', `${message.member || undefined}`, true)
          .addField('Membre', `${member || undefined}`, true)
          .addField('Raison', `${reason || undefined}`)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor("#e67e22")
          message.channel.send({ embeds: [embed] })
          message.author.send(`${message.guild.name}: ${message.author.tag} kicked ${member.user.tag} for reason: ${reason}`)
              

      //ERROR CATCH
      } catch (err) {
      const errorEmbed = new MessageEmbed()
      .setTitle("ERREUR")
      .setDescription(`${client.emoji.fail} ${err.message}`)
      .setColor("#e67e22")
      .setFooter("Le message sera supprimé après 10 secondes");
      message.channel.send({ embeds: [errorEmbed] }).then(e => {
        setTimeout(() => e.delete(), 10000);
      });
    }
  }
};