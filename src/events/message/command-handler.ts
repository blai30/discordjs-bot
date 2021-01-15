import { Message } from 'discord.js';
import { config } from '../../config';
import { logger } from '../../utils/logger';

export const commandHandler = async (message: Message): Promise<void> => {
  // Make sure the message contains the command prefix from the config.json.
  if (!message.content.startsWith(config.prefix)) {
    return;
  }
  // Make sure the message author isn't a bot.
  if (message.author.bot) {
    return;
  }

  // Example: !args-info here are my arguments
  // Command: args-info
  // Arguments: ["here", "are", "my", "arguments"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const commandAlias = args.shift().toLowerCase();

  // Identify command by name or alias.
  const command = message.client.commands.get(commandAlias);

  // Not a valid command.
  if (!command) {
    logger.warn(`${commandAlias} is not a valid command.`);
    return;
  }

  await command.execute(message, args);
};
