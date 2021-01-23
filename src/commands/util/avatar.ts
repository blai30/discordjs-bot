import {
  Client as discordClient, Message, MessageEmbed, User,
} from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { embedColor } from '../../config';

const getUserFromMention = (client: discordClient, mention: string): User => {
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

class AvatarCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'avatar',
      aliases: ['avatar'],
      group: 'util',
      memberName: 'avatar',
      description: 'View your own avatar or a mentioned user\'s avatar.',
      args: [
        {
          key: 'mention',
          prompt: 'Mention a user to view their avatar.',
          type: 'user',
        },
      ],
    });

    this.examples = [`${this.aliases[0]} [@user]`];
  }

  public run(message: CommandoMessage, args: string[]): Promise<Message> {
    const user = getUserFromMention(this.client, args[0]) ?? message.author;

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

    return message.embed(new MessageEmbed(embedOptions));
  }
}

export { AvatarCommand };
