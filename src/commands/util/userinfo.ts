import { Message, MessageEmbed, User } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { embedColor } from '../../config';

export class UserInfoCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'userinfo',
      aliases: ['userinfo'],
      group: 'util',
      memberName: 'userinfo',
      description: 'Display information about the user or a mentioned user.',
      args: [
        {
          key: 'mention',
          prompt: 'Mention a user to view their information.',
          type: 'user',
          default: '',
        },
      ],
    });

    this.examples = [`${this.aliases[0]} [@user]`];
  }

  public run(message: CommandoMessage, { mention }: { mention: User }): Promise<Message> {
    const user = mention || message.author;
    const avatarURL = user.avatarURL({ dynamic: true });

    const embedOptions = {
      title: 'Icon direct link',
      url: avatarURL,
      author: {
        name: user.username,
        icon_url: avatarURL,
      },
      description: `Full username: ${user.tag}`,
      color: embedColor,
      thumbnail: {
        url: avatarURL,
      },
      footer: {
        text: `Created: ${user.createdAt.toUTCString()}`,
      },
      fields: [
        {
          name: 'ID',
          value: user.id,
          inline: true,
        },
        {
          name: 'Bot',
          value: user.bot,
          inline: true,
        },
        {
          name: 'Presence',
          value: user.presence.status,
          inline: true,
        },
      ],
    };

    return message.embed(new MessageEmbed(embedOptions));
  }
}
