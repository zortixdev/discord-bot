const client = require("../index.js")
const wait = require('util').promisify(setTimeout);
client.on('interactionCreate', async interaction => {
  const member = await interaction.message.guild.members.fetch({
    user: interaction.user.id,
    force: true 
  })
  if(!interaction.isSelectMenu()) return;

  if(interaction.values == '✅・Vérifié') {
    if(!member.roles.cache.has("920368304479150092")) {
      await member.roles.add('920368304479150092')
      return interaction.member.send(`${client.emoji.success} | ${member.displayName}\nLe rôle **✅・Vérifié** t'a été rajouté`)
    } else if(member.roles.cache.has("920368304479150092")) {
      await member.roles.remove('920368304479150092')
      return interaction.member.send(`${client.emoji.fail} | ${member.displayName}\nLe rôle **✅・Vérifié** t'a été retiré`)
    }
  }

  if(interaction.values == '📢・Notification') {
    if(!member.roles.cache.has("922921597730422795")) {
      await member.roles.add('922921597730422795')
      return interaction.member.send(`${client.emoji.success} | ${member.displayName}\nLe rôle **📢・Notification** t'a été rajouté`)
    } else if(member.roles.cache.has("922921597730422795")) {
      await member.roles.remove('922921597730422795')
      return interaction.member.send(`${client.emoji.fail} | ${member.displayName}\nLe rôle **📢・Notification** t'a été retirée`)
    }
  }
})