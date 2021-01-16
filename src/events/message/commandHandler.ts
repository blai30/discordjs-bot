import { Message } from 'discord.js';
import { commandList } from '../../commands';
import { prefix } from '../../config';
import { logger } from '../../utils/logger';

export const commandHandler = async (message: Message): Promise<void> => {
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
  const commandAlias = args.shift().toLowerCase();

  // Identify command by alias.
  // const command = message.client.commands.get(commandAlias);
  const command = commandList.find(({aliases}) => aliases.find((alias) => alias === commandAlias));

  // Not a valid command.
  if (!command) {
    logger.warn(`${commandAlias} is not a valid command.`);
    return;
  }

  await command.execute(message, args);
};
