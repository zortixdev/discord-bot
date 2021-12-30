// i have already coded the ticket system and posted it on my server so join my server and go to js codes

const {
    Client,
    Message,
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js');

module.exports = {
    name: 'ticket-panel',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const embed = new MessageEmbed()
            .setColor('#e67e22')
            .setAuthor(message.guild.name, message.guild.iconURL({
                dynamic: true
            }))
            .setDescription(
                "<:what:920395974495572079> | __**Comment faire un ticket**__\n\n" +

                "> Cliquez sur la réaction qui correspond à votre besoin\n" +

                "> Une fois le ticket fait, vous pourrez y taper"

            )
            .setTitle('Ticket')


        const bt = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('tic')
                .setLabel('🎫 Create Ticket!')
                .setStyle('PRIMARY'),
            );

        message.channel.send({
            embeds: [embed],
            components: [bt]
        });
    }
}