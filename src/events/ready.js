const config = require('../config');
const { version } = require('../../package.json');

const versions = {
  production: 'production',
  development: 'development',
};

module.exports = async (client) => {
  // Present startup information.
  await client.logger.info(`Client logged in as ${client.user.tag} (${client.user.id}) in ${client.guilds.cache.size} server(s).`);
  await client.logger.info(`Version ${version} of the bot loaded.`);
  await client.logger.info(`Running in ${versions[process.env.NODE_ENV]} environment.`);

  const helpCommand = client.commands.get('help').info.name;

  // Display help command in as user status.
  await client.user.setPresence({
    status: 'online',
    activity: {
      name: `${config.prefix + helpCommand}`,
      type: 'PLAYING',
    },
  }).catch((err) => client.logger.error(err));
};
