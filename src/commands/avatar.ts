import {
  Client, Message, MessageEmbed, User,
} from 'discord.js';
import { Command } from '../structures/command';
import { embedColor } from '../config';

const getUserFromMention = (client: Client, mention: string): User => {
  // No user is mentioned.
  if (!mention || mention === '' || mention === null) {
    return null;
  }

  // The id is the first and only match found by the RegEx.
  const matches = /^<@!?(\d+)>$/.exec(mention);

  // If supplied variable was not a mention, matches will be null instead of an array.
  if (!matches) {
    return null;
  }

  // However the first element in the matches array will be the entire mention,
  // not just the ID, so use index 1.
  const id = matches[1];

  return client.users.cache.get(id);
};

const aliases = ['avatar'];

const description = 'View your own avatar or a mentioned user\'s avatar.';

const category = 'info';

const usage = `${aliases[0]} [@user]`;

const execute = async (message: Message, args: string[]): Promise<Message> => {
  const user = getUserFromMention(message.client, args[0]) ?? message.author;

  const avatar = user.avatarURL({
    dynamic: true,
    size: 4096,
  });

  const embedOptions = {
    title: 'Direct link',
    url: avatar,
    author: {
      name: user.tag,
      icon_url: avatar,
    },
    color: embedColor,
    image: {
      url: avatar,
    },
  };

  return message.channel.send(new MessageEmbed(embedOptions));
};

export const avatar: Command = {
  aliases,
  description,
  category,
  usage,
  execute,
};
