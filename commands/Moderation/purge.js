const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'purge',
    aliases: ['clear'],
    UserPerms: ['MANAGE_MESSAGES'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        try {
            let delamount = args[0];
            if (isNaN(delamount) || parseInt(delamount <= 0)) return message.reply('Error:')

            if (parseInt(delamount) > 100) return message.reply('Vous ne pouvez pas supprimer 100 messages à la fois !')

            await message.channel.bulkDelete(parseInt(delamount) + 1, true);

            await message.channel.send('Purgé!').then(m => {
                setTimeout(() => {
                    m.delete()
                }, 5000) // 5 seconds
            })
        } catch (e) {
            console.log(e)
        } //lets try it
    }
}