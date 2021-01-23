import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../structures/command';
import { embedColor } from '../config';

const aliases = ['serverinfo'];

const description = 'Display server info.';

const category = 'info';

const usage = aliases[0];

const execute = async (message: Message): Promise<Message> => {
  const channels = message.guild.channels.cache;
  const emojis = message.guild.emojis.cache;
  const roles = message.guild.roles.cache;
  const guildIconUrl = message.guild.iconURL({ dynamic: true });

  const embedOptions = {
    title: 'Icon direct link',
    url: guildIconUrl,
    author: {
      name: message.guild.name,
      icon_url: guildIconUrl,
    },
    description: `Owner: ${message.guild.owner.user.toString()}`,
    color: embedColor,
    thumbnail: {
      url: guildIconUrl,
    },
    footer: {
      text: `Created: ${message.guild.createdAt.toUTCString()}`,
    },
    fields: [
      {
        name: 'ID',
        value: message.guild.id,
        inline: true,
      },
      {
        name: 'Region',
        value: message.guild.region,
        inline: true,
      },
      {
        name: 'Members',
        value: message.guild.memberCount,
        inline: true,
      },
      {
        name: 'Channels',
        value: `${channels.filter((channel) => channel.type === 'text').size} text
                ${channels.filter((channel) => channel.type === 'voice').size} voice`,
        inline: true,
      },
      {
        name: 'Emojis',
        value: `${emojis.filter((emoji) => !emoji.animated).size} static
                ${emojis.filter((emoji) => emoji.animated).size} animated`,
        inline: true,
      },
      {
        name: 'Premium',
        value: `Level ${message.guild.premiumTier}
                ${message.guild.premiumSubscriptionCount} boosts`,
        inline: true,
      },
      {
        name: `Roles: ${roles.size}`,
        value: `${roles.map((role) => role.name).sort().join(', ')}`,
        inline: false,
      },
    ],
  };

  return message.channel.send(new MessageEmbed(embedOptions));
};

export const serverInfo: Command = {
  aliases,
  description,
  category,
  usage,
  execute,
};
