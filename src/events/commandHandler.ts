import { Message } from 'discord.js';
import * as config from '../config';
import { logger } from '../utils/logger';

export const commandHandler = async (message: Message): Promise<void> => {
  // Use mention as prefix if no prefix is defined in config.
  let prefix = config.prefix;
  if (!prefix) {
    prefix = `<@!${message.client.user.id}> `;
  }

  // Make sure the message contains the command prefix from the config.json.
  if (!message.content.startsWith(prefix)) {
    return;
  }
  // Make sure the message author isn't a bot.
  if (message.author.bot) {
    return;
  }

  // Example: !args-info here are my arguments
  // Command: args-info
  // Arguments: ["here", "are", "my", "arguments"]
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  // Identify command by name or alias.
  const command = message.client.commands.get(commandName)
    || message.client.commands.get(message.client.aliases.get(commandName));

  // Not a valid command.
  if (!command) {
    logger.warn(`${commandName} is not a valid command.`);
    return;
  }

  await command.execute(message, args);
};
