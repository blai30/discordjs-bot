import { Client } from 'discord.js';
import { token } from './config';
import { ready } from './events/ready';
import { commandHandler } from './events/message/commandHandler';

enum PrivilegedIntents {
  GUILD_PRESENCES = 'GUILD_PRESENCES',
  GUILD_MEMBERS = 'GUILD_MEMBERS',
}

(async () => {
  // Create new client object.
  const client = new Client({
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
  });

  /* eslint-disable @typescript-eslint/no-misused-promises */

  // Register ready socket event.
  client.once('ready', () => ready(client));

  // Register command handler for message socket event.
  client.on('message', (message) => commandHandler(message));

  /* eslint-enable @typescript-eslint/no-misused-promises */

  // Log into the discord client using bot token.
  await client.login(token);
})().catch((error) => {
  throw error;
});
