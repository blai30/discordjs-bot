import { Collection } from 'discord.js';
import { config } from './config';
import { Client } from './structures/client';
import { commandHandler } from './events/message/command-handler';
import { ready } from './events/ready';
import { Command } from './structures/command';

(async () => {
  // Create new client object.
  const client = new Client();

  // Initialize collections.
  client.commands = new Collection<string, Command>();

  // Load command modules into collection.
  await client.loadCommands(config.paths.commands);

  // Register ready socket event.
  client.once('ready', () => ready(client));

  // Register command handler for message socket event.
  client.on('message', (message) => commandHandler(message));

  // Log into the discord client using bot token.
  await client.login(config.token);
})().catch((error) => {
  throw error;
});
