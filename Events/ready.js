const client = require('../index.js');
const activities = [
    { name: '✨・SunnyLifeRP', type: 'STREAMING' }, 
    { name: '✨・Ses Membres', type: 'LISTENING' }
];

client.on('ready', () => {
  client.user.setPresence({ status: 'online', activity: activities[0] });
  let activity = 1;
  setInterval(() => {
    activities[2] = { name: `👮‍♂️・Douanes Ouvertes`, type: 'WATCHING' };
    activities[3] = { name: `📚・Règlement`, type: 'WATCHING' };
    if(activity > 3) activity = 0;
    client.user.setActivity(activities[activity]);
    activity++;
  }, 5000);
    client.logger.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=', 'ready');
    client.logger.ready(`${client.user.tag}, ready to watch [${client.users.cache.size}] users in [${client.guilds.cache.size}] servers.`, 'ready');
    client.logger.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=', 'ready');
});