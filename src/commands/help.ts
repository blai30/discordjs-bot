import { Message, MessageEmbed } from 'discord.js';
import { Command, commandList } from './index';
import { embedColor } from '../config';

const aliases = ['help', 'h', 'halp'];

const description = 'View all commands.';

const category = 'info';

const usage = aliases[0];

const execute = async (message: Message): Promise<Message> => {
  // Get array of available commands using first alias.
  const botCommands = commandList.map((command) => `\`${command.aliases[0]}\``);
  const clientUser = message.client.user;

  // Create the message embed for help.
  const embed = new MessageEmbed()
    .setColor(embedColor)
    .setTitle('Help information')
    .setDescription(`View help information for ${clientUser.toString()}.\nEnter \`@${clientUser.username} ${aliases[0]} <command>\` for command info.`)
    .addFields(
      {
        name: 'Executing commands',
        value: `Mention ${clientUser.toString()} followed by the command.
      \`eg. @${message.client.user.username} help\``,
      },
      {
        name: 'Available commands',
        value: botCommands.sort().join(', '),
      },
    );

  const avatar = message.client.user.avatarURL();
  if (avatar) {
    embed.setThumbnail(avatar);
  }

  return message.channel.send(embed);
};

export const help: Command = {
  aliases,
  description,
  category,
  usage,
  execute,
};
