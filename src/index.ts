import { CommandoClient } from 'discord.js-commando';
import 'reflect-metadata';
import { owner, paths, prefix, token } from './config';
import { ready } from './events/ready';
import { logger } from './utils/logger';
import { initConnection } from './orm';

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
    .registerCommandsIn({
      // Register .ts files for ts-node.
      filter: /^([^.].*)\.(js|ts)?$/,
      dirname: paths.commands,
    });

  // Print available commands to log.
  const commandNames = client.registry.commands.map((command) => command.name);
  logger.info(`${commandNames.length} commands loaded: ${commandNames.join(', ')}.`);

  // Initialize typeorm database connection.
  await initConnection();

  // Register ready socket event.
  client.once('ready', () => ready(client));

  client.on('warn', logger.warn);
  client.on('error', logger.error);

  client.on('disconnect', () => {
    logger.warn('Reconnecting...');
  });

  // Log into the discord client using bot token.
  await client.login(token);
})().catch((error) => {
  logger.error(error);
  throw error;
});
