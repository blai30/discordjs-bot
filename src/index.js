const { promises: fs } = require('fs');
const { Client, Collection } = require('discord.js');

require('dotenv').config();

// Load config file to use for client. Includes token.
const { token } = require('./config');

const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();
client.logger = require('./utils/logger');

const init = async () => {
  // Load bot commands.
  const commandFiles = await fs.readdir(`${__dirname}/commands`);
  const commandScripts = commandFiles.filter((file) => file.endsWith('.js'));
  commandScripts
    .forEach((file) => {
      try {
        // Load command module.
        const command = require(`./commands/${file}`);

        // Initialize command with client if required.
        if (command.init) {
          command.init(client);
        }

        // Add commands and their aliases to the collections.
        // Set new item in collection with command name as key and exported module as value.
        client.commands.set(command.info.name, command);
        command.info.aliases.forEach((alias) => {
          client.aliases.set(alias, command.info.name);
        });
        client.logger.info(`Loaded command: "${file}".`);
      } catch (err) {
        client.logger.error(`Unable to load command "${file}".`);
        client.logger.error(`${err}`);
      }
    });
  client.logger.info(`Loaded a total of ${commandScripts.length} commands.`);

  // Load client events.
  const eventFiles = await fs.readdir(`${__dirname}/events`);
  const eventScripts = eventFiles.filter((file) => file.endsWith('.js'));
  eventScripts
    .forEach((file) => {
      // Use file name as event name.
      const eventName = file.split('.')[0];
      const event = require(`./events/${file}`);
      // Register event handler.
      client.on(eventName, event.bind(null, client));
      client.logger.info(`Loaded event: "${eventName}".`);
    });
  client.logger.info(`Loaded a total of ${eventScripts.length} events.`);

  // Login to discord client.
  await client.login(token);
};

init().then();
