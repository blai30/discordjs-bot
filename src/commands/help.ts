import { Message, MessageEmbed } from 'discord.js';
import { commandList } from './index';
import { Command } from '../structures/command';
import { embedColor } from '../config';

const aliases = ['help', 'h', 'halp'];

const description = 'View all commands.';

const category = 'info';

const usage = `${aliases[0]} [command]`;

const execute = async (message: Message): Promise<Message> => {
  // Get array of available commands using first alias.
  const botCommands = commandList.map((command) => `\`${command.aliases[0]}\``);
  const clientUser = message.client.user;

  // Create the message embed for help.
  const embedOptions = {
    title: 'Help information',
    color: embedColor,
    thumbnail: {
      url: message.client.user.avatarURL({ dynamic: true }),
    },
    description: `View help information for ${clientUser.toString()}.
                  Enter \`@${clientUser.username} ${aliases[0]} [command]\` for command info.`,
    fields: [
      {
        name: 'Executing commands',
        value: `Mention ${clientUser.toString()} followed by the command.
                \`@${message.client.user.username} [command]\`
                \`eg. @${message.client.user.username} ping\``,
      },
      {
        name: 'Available commands',
        value: botCommands.sort().join(', '),
      },
    ],
  };

  return message.channel.send(new MessageEmbed(embedOptions));
};

export const help: Command = {
  aliases,
  description,
  category,
  usage,
  execute,
};
