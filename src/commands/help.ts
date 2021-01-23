import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../structures/command';
// eslint-disable-next-line import/no-cycle
import { commandList } from './index';
import { embedColor, inviteUrl } from '../config';

const links = [
  `[Invite me](${inviteUrl})`,
  `[Invite me](${inviteUrl})`,
];

const aliases = ['help', 'h', 'halp'];

const description = 'View all commands.';

const category = 'info';

const usage = `${aliases[0]} [command]`;

const execute = async (message: Message): Promise<Message> => {
  // Get array of available commands using first alias.
  const botCommands = commandList.map((command) => `\`${command.aliases[0]}\``);
  const clientUser = message.client.user;
  const avatar = message.client.user.avatarURL({ dynamic: true });

  // Create the message embed for help.
  const embedOptions = {
    author: {
      name: clientUser.username,
      icon_url: avatar,
    },
    color: embedColor,
    thumbnail: {
      url: avatar,
    },
    description: `View available commands for ${clientUser.toString()}.
                  Enter \`@${clientUser.username} ${aliases[0]} [command]\` for command help info.`,
    fields: [
      {
        name: 'Available commands',
        value: botCommands.sort().join(', '),
      },
      {
        name: 'Examples',
        value: `\`@${message.client.user.username} help avatar\` to view help for the avatar command.`,
      },
      {
        name: 'Useful links:',
        value: links.join(', '),
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
