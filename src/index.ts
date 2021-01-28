import { CommandoClient } from 'discord.js-commando';
import { owner, prefix, token } from './config';
import { commandList } from './commands';
import { ready } from './events/ready';
import { logger } from './utils/logger';
import * as db from './database/database';

const commandGroups = [
  ['fun', 'Fun'],
  ['general', 'General'],
  ['roles', 'Reaction Roles'],
  ['tags', 'Tags'],
  ['util', 'Utility'],
];

(async () => {
  // Create new client object.
  const client = new CommandoClient({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER'],
    ws: {
      intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_PRESENCES',
        'GUILD_MEMBERS',
      ],
    },
    // Will be null. No prefix, use mention only.
    commandPrefix: prefix,
    owner,
  });

  client.registry
    .registerDefaultTypes()
    .registerGroups(commandGroups)
    .registerCommands(commandList);

  // Print available commands to log.
  const commandNames = client.registry.commands.map((command) => command.name);
  logger.info(`${commandNames.length} commands loaded: ${commandNames.join(', ')}.`);

  await db.sync();

  // Register ready socket event.
  client.once('ready', () => ready(client));

  client.on('error', logger.error);

  // Log into the discord client using bot token.
  await client.login(token);
})().catch((error) => {
  logger.error(error);
  throw error;
});
