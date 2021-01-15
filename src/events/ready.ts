import { Client } from 'discord.js';
import { config } from '../config';
import { logger } from '../utils/logger';

export const ready = async (client: Client): Promise<void> => {
  if (client.user === undefined) {
    return;
  }

  // Present startup information.
  logger.info(`Client logged in as ${client.user.tag} (${client.user.id}) in ${client.guilds.cache.size} server(s).`);
  logger.info(`Running in ${config.environment} environment.`);

  // Display help command in as user status.
  await client.user.setPresence({
    status: 'online',
    activity: {
      name: `@${client.user.username} help`,
      type: 'PLAYING',
    },
  }).catch((error) => logger.error(error));
};
