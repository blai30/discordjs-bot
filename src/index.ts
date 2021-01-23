import { CommandoClient } from 'discord.js-commando';
import { owner, prefix, token } from './config';
import { ready } from './events/ready';
import { logger } from './utils/logger';
import { commandList } from './commands';

enum PrivilegedIntents {
  GUILD_PRESENCES = 'GUILD_PRESENCES',
  GUILD_MEMBERS = 'GUILD_MEMBERS',
}

const commandGroups = [
  ['info', 'Informational commands'],
  ['util', 'Utility commands'],
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
    commandPrefix: prefix,
    owner,
  });

  client.registry
    .registerDefaultTypes()
    .registerGroups(commandGroups)
    .registerDefaultGroups()
    .registerDefaultCommands({
      unknownCommand: false,
      help: false,
      ping: false,
    })
    .registerCommands(commandList);

  /* eslint-disable @typescript-eslint/no-misused-promises */

  // Register ready socket event.
  client.once('ready', () => ready(client));

  client.on('error', logger.error);

  /* eslint-enable @typescript-eslint/no-misused-promises */

  // Log into the discord client using bot token.
  await client.login(token);
})().catch((error) => {
  throw error;
});
