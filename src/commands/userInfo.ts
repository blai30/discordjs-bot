import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../structures/command';
import { embedColor } from '../config';

const aliases = ['userinfo'];

const description = 'Display user info.';

const category = 'info';

const usage = `${aliases[0]} [@user]`;

const execute = async (message: Message): Promise<Message> => {
  const avatarURL = message.author.avatarURL({ dynamic: true });

  const embedOptions = {
    title: 'Icon direct link',
    url: avatarURL,
    author: {
      name: message.author.username,
      icon_url: avatarURL,
    },
    description: `Full username: ${message.author.tag}`,
    color: embedColor,
    thumbnail: {
      url: avatarURL,
    },
    footer: {
      text: `Created: ${message.author.createdAt.toUTCString()}`,
    },
    fields: [
      {
        name: 'ID',
        value: message.author.id,
        inline: true,
      },
      {
        name: 'Bot',
        value: message.author.bot,
        inline: true,
      },
      {
        name: 'Presence',
        value: message.author.presence.status,
        inline: true,
      },
    ],
  };

  return message.channel.send(new MessageEmbed(embedOptions));
};

export const userInfo: Command = {
  aliases,
  description,
  category,
  usage,
  execute,
};
