import { Message, MessageEmbed } from 'discord.js';
import { embedColor } from '../config';
import { logger } from '../utils/logger';

export const name = 'help';

export const description = 'View all commands.';

export const category = 'info';

export const aliases = ['h', 'halp'];

export const usage = 'help';

export const execute = async (message: Message, args: string[]): Promise<Message> => {
  logger.info(args);

  const botCommands = message.client.commands.map((command) => `\`${command.usage}\``);

  // Create the message embed for help.
  const embed = new MessageEmbed()
    .setColor(embedColor)
    .setTitle('Help information')
    .setDescription(`View help information for ${message.client.user}.\nEnter \`${name} <command>\` for command info.`)
    .addFields(
      {
        name: 'Executing commands',
        value: `Mention ${message.client.user} followed by the command.
        \`eg. @${message.client.user.username} help\``,
      },
      {
        name: 'Available commands',
        value: botCommands.join(', '),
      },
    );

  const avatar = message.client.user.avatarURL();
  if (avatar) {
    embed.setThumbnail(avatar);
  }

  return message.channel.send(embed);
};
