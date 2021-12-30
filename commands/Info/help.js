const { MessageEmbed, Message, Client } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndent } = require('common-tags');
let color = "#ff0000";

const create_mh = require(`../../Functions/menu.js`);
module.exports = {
    name: "help",
    aliases: [`h`],
    description: "Affiche toutes les commandes de bot disponibles",
    run: async (client, message, args, prefix) => {
        if(!message.content.startsWith(prefix)) return;
        try{
        let categories = [];
        let cots = [];

        if (!args[0]) {
            let ignored = [
                "test"
            ];


            let ccate = [];
            readdirSync("./Commands/").forEach((dir) => {
                if (ignored.includes(dir.toLowerCase())) return;
                const commands = readdirSync(`./Commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                if (ignored.includes(dir.toLowerCase())) return;

                const name = `${dir}`;
                let nome = dir.toUpperCase();

                let cats = new Object();
                cats = {
                    name: name,
                    value: `\`${prefix}help ${dir.toLowerCase()}\``,
                    inline: true
                };


                categories.push(cats);
                ccate.push(nome);
            });
            
            const embed = new MessageEmbed()
                .setTitle(`Bot Commands`)
                .setDescription(`\`\`\`js\n"Prefix": <${prefix}> || "Prefix par Défaut": <!>\n"Syntex": <${prefix}help command_name>\`\`\``)
                .addFields(categories)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(color);

            let menus = create_mh(ccate);
            return message.reply({
                embeds: [embed],
                components: menus.smenu
            }).then((msgg) => {

                const menuID = menus.sid;

                const select = async (interaction) => {
                    if (interaction.customId != menuID) return;

                    let {
                        values
                    } = interaction;

                    let value = values[0];

                    let catts = [];

                    readdirSync("./Commands/").forEach((dir) => {
                        if (dir.toLowerCase() !== value.toLowerCase()) return;
                        const commands = readdirSync(`./Commands/${dir}/`).filter((file) =>
                            file.endsWith(".js")
                        );
                        const cmds = commands.map((command) => {
                            let file = require(`../../Commands/${dir}/${command}`); //getting the commands again

                            if (!file.name) return "Pas de nom de commande.";

                            let name = file.name.replace(".js", "");

                            if (client.commands.get(name).hidden) return;


                            let des = client.commands.get(name).description;
                            let obj = {
                                cname: `\`${name}\``,
                                des
                            };

                            return obj;
                        });

                        let dota = new Object();

                        cmds.map(co => {
                            if (co == undefined) return;

                            dota = {
                                name: `${cmds.length === 0 ? "En cours." : co.cname}`,
                                value: co.des ? co.des : `Pas de description`,
                                inline: true,
                            };
                            catts.push(dota);
                        });

                        cots.push(dir.toLowerCase());
                    });

                    if (cots.includes(value.toLowerCase())) {
                        const combed = new MessageEmbed()
                            .setTitle(`__${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`)
                            .setDescription(`Utiliser \`${prefix}help\` suivi d'un nom de commande pour obtenir plus d'informations sur une commande.\Par exemple: \`${prefix}help ping\`.\n\n`)
                            .addFields(catts)
                            .setColor(color);

                        return interaction.message.edit({ embeds: [combed], components: menus.smenu});
                    }
                };
                const filter = (interaction) => {
                    return !interaction.user.bot && interaction.user.id == message.author.id;
                };

                const collector = msgg.createMessageComponentCollector({
                    filter,
                    componentType: "SELECT_MENU"
                });
                collector.on("collect", select);
                collector.on("end", () => null);

            });

        } else {
            let catts = [];

            readdirSync("./Commands/").forEach((dir) => {
                if (dir.toLowerCase() !== args[0].toLowerCase()) return;
                const commands = readdirSync(`./Commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );
                    
                const cmds = commands.map((command) => {
                    let file = require(`../../Commands/${dir}/${command}`);
                    if (!file.name) return "Pas de nom de commande.";
                    let name = file.name.replace(".js", "");
                    if (client.commands.get(name).hidden) return;
                    let des = client.commands.get(name).description;
                    let obj = {
                        cname: `\`${name}\``,
                        des
                    };
                    return obj;
                });
                let dota = new Object();
                cmds.map(co => {
                    if (co == undefined) return;
                    dota = {
                        name: `${cmds.length === 0 ? "En cours." : prefix + co.cname}`,
                        value: co.des ? co.des : `Pas de description`,
                        inline: true,
                    };
                    catts.push(dota);
                });

                cots.push(dir.toLowerCase());
            });

            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if (cots.includes(args[0].toLowerCase())) {
                const combed = new MessageEmbed()
                    .setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
                    .setDescription(`Utiliser \`${prefix}help\` suivi d'un nom de commande pour obtenir plus d'informations sur une commande.\Par exemple: \`${prefix}help ping\`.\n\n`)
                    .addFields(catts)
                    .setColor(color);

                return message.reply({ embeds: [combed] });
            }

            if (!command) {
                const embed = new MessageEmbed()
                    .setTitle(`Commande non valide! Utiliser \`${prefix}help\` pour toutes mes commandes!`)
                    .setColor("#e67e22");
                return await message.reply({
                    embeds: [embed],
                    allowedMentions: {
                        repliedUser: false
                    },
                });
            }
            const embed = new MessageEmbed()
                .setTitle("Détails de la commande:")
                .addField(
                    "Commandes:",
                    command.name ? `\`${command.name}\`` : "Pas de nom pour cette commande."
                )
                .addField(
                    "Aliases:",
                    command.aliases ?
                    `\`${command.aliases.join("` `")}\`` :
                    "Aucun alias pour cette commande."
                )
                .addField(
                    "Usage:",
                    command.usage ?
                    `\`${prefix}${command.name} ${command.usage}\`` :
                    `\`${prefix}${command.name}\``
                )
                .addField(
                    "Descriptions des commandes:",
                    command.description ?
                    command.description :
                    "Aucune description pour cette commande."
                )
                .setFooter(
                    `Demandé par ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(color);
            return await message.reply({
                embeds: [embed]
            });
           }
           
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
  },
}