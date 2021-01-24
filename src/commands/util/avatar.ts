import {
  Message, MessageEmbed, User,
} from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { embedColor } from '../../config';

export class AvatarCommand extends Command {
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
          default: '',
        },
      ],
    });

    this.examples = [`${this.aliases[0]} [@user]`];
  }

  public run(message: CommandoMessage, { mention }: { mention: User }): Promise<Message> {
    const user = mention || message.author;

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
