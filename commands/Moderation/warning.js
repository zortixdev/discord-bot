const db = require("quick.db");
const colors = require('./../../colors.json')
const Discord = require('discord.js')


module.exports = {
  name: "warnings",
  description: "Montre les warns des utilisateurs",
  aliases: ["warns"],
  async run (client, message, args, prefix)  {
    if(!message.content.startsWith(prefix)) return;
    const user = message.mentions.members.first() || message.author;

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) warnings = 0;

    message.channel.send(`${user} à **${warnings}** warn(s)`);
  }
};