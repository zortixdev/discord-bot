const chalk = require(`chalk`);
const { MessageSelectMenu, MessageActionRow } = require(`discord.js`);

const create_mh = (array) => {
    if (!array) throw new Error(chalk.red.bold(`Les options n'étaient pas fournies! Assurez-vous de fournir toutes les options!`));
    if (array.length < 0) throw new Error(chalk.red.bold(`Le tableau doit avoir au moins une chose à sélectionner!`));
    let select_menu;
    let id = `help-menus`;
    let menus = [];

    array.forEach(cca => {
        let name = cca;
        let sName = `${name.toUpperCase()}`;
        let tName = name.toLowerCase();
        let fName = name.toUpperCase();

        return menus.push({
            label: sName,
            description: `${tName} commandes!`,
            value: fName
        });
    });

    let smenu1 = new MessageSelectMenu()
        .setCustomId(id)
        .setPlaceholder(`Choisissez la catégorie de commande`)
        .addOptions(menus);

    select_menu = new MessageActionRow()
        .addComponents(
            smenu1
        );


    return {
        smenu: [select_menu],
        sid: id
    };
};

module.exports = create_mh;