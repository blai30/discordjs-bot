import { Client } from 'discord.js';
import { environment } from '../config';
import { logger } from '../utils/logger';
import { commandList } from '../commands';

export const ready = async (client: Client): Promise<void> => {
  if (client.user === undefined) {
    return;
  }

  // Present startup information.
  logger.info(`Client logged in as ${client.user.tag} (${client.user.id}) in ${client.guilds.cache.size} server(s).`);
  logger.info(`Running in ${environment} environment.`);

  // Display help command in as user status.
  await client.user.setPresence({
    status: 'online',
    activity: {
      name: `@${client.user.username} help`,
      type: 'PLAYING',
    },
  }).catch((error) => logger.error(error));

  // Print available commands to log.
  const commandNames = commandList.map((command) => command.aliases[0]);
  logger.info(`${commandList.length} commands available: ${commandNames.join(', ')}`);
};
