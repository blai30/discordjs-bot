import { Message, MessageEmbed } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { embedColor } from '../../config';

class UserInfoCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'userinfo',
      aliases: ['userinfo'],
      group: 'info',
      memberName: 'userinfo',
      description: 'Display information about the user or a mentioned user.',
    });

    this.examples = [`${this.aliases[0]} [@user]`];
  }

  public run(message: CommandoMessage): Promise<Message | Message[] | null> | null {
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

    return message.embed(new MessageEmbed(embedOptions));
  }
}

export { UserInfoCommand };
