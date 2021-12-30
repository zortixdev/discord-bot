const client = require("../index.js");
const { MessageEmbed } = require('discord.js');

client.on('guildMemberRemove', async(member) => {
  const Channel = member.guild.channels.cache.get('920373924578070568')
  const embed = new MessageEmbed()
  .setColor("#e67e22")
  .setTitle(`<:fleche:920771472258105454> Aurevoir **${member.displayName}**`)
  .setDescription(`> Aurevoir **${member.displayName}** ravis d'avoir fait ta connaissance sur **${member.guild.name}**\n> Nous sommes maintenant **${member.guild.memberCount}** membres <:yellow:920395974474600468>`)
  .setTimestamp()
  .setThumbnail(member.user.avatarURL())
  .setImage("https://i.ibb.co/z5TY5h2/aurevoir.png")
  .setFooter(`ID: ${member.id}`)
  Channel.send({ embeds: [embed] })
})