const client = require("../index.js");
const { MessageEmbed } = require('discord.js');

client.on('guildMemberAdd', async(member) => {
  const Channel = member.guild.channels.cache.get('920373924578070568')
  const embed = new MessageEmbed()
  .setColor("#e67e22")
  .setTitle(`<:fleche:920771472258105454> Bienvenue dans **${member.guild.name}**`)
  .setURL("https://discord.com/channels/920031002422829086/920377021652148284")
  .setDescription(`> Bienvenue **${member.displayName}** dans **${member.guild.name}**\n> Grâce à toi nous sommes maintenant **${member.guild.memberCount}** membres <:yellow:920395974474600468>`)
  .setTimestamp()
  .setThumbnail(member.user.avatarURL())
  .setImage("https://i.ibb.co/1Q6MYrw/BIENVENUE.png")
  .setFooter(`ID: ${member.id}`)
  Channel.send({ embeds: [embed] })
})