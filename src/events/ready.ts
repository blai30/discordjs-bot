import BotClient from '../structures/BotClient';
import { prefix, environment } from '../config';

module.exports = async (client: BotClient) => {
  // Present startup information.
  client.logger.info(`Client logged in as ${client.user.tag} (${client.user.id}) in ${client.guilds.cache.size} server(s).`);
  client.logger.info(`Running in ${environment} environment.`);

  const helpCommand = client.commands.get('help').name;

  // Display help command in as user status.
  await client.user.setPresence({
    status: 'online',
    activity: {
      name: `${prefix}${helpCommand}`,
      type: 'PLAYING',
    },
  }).catch((err) => client.logger.error(err));
};
