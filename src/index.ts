import { CommandoClient } from 'discord.js-commando';
import { owner, token } from './config';
import { commandList } from './commands';
import { ready } from './events/ready';
import { logger } from './utils/logger';

enum PrivilegedIntents {
  GUILD_PRESENCES = 'GUILD_PRESENCES',
  GUILD_MEMBERS = 'GUILD_MEMBERS',
}

const commandGroups = [
  ['fun', 'Fun'],
  ['general', 'General'],
  ['util', 'Utility'],
];

(async () => {
  // Create new client object.
  const client = new CommandoClient({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    ws: {
      intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        PrivilegedIntents.GUILD_PRESENCES,
        PrivilegedIntents.GUILD_MEMBERS,
      ],
    },
    // No prefix, use mention only.
    commandPrefix: null,
    owner,
  });

  client.registry
    .registerDefaultTypes()
    .registerGroups(commandGroups)
    .registerCommands(commandList);

  // Print available commands to log.
  const commandNames = client.registry.commands.map((command) => command.name);
  logger.info(`${commandNames.length} commands loaded: ${commandNames.join(', ')}.`);

  // Register ready socket event.
  client.once('ready', () => ready(client));

  client.on('error', logger.error);

  // Log into the discord client using bot token.
  await client.login(token);
})().catch((error) => {
  logger.error(error);
  throw error;
});
