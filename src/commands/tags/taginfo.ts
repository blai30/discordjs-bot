import { Message } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { Tag } from '../../models/tag';

export class TagInfoCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'taginfo',
      aliases: ['taginfo'],
      group: 'tags',
      memberName: 'taginfo',
      description: 'View tag info.',
      args: [
        {
          key: 'tagName',
          type: 'string',
          prompt: 'Provide a tag name to display tag info.',
        },
      ],
    });

    this.examples = [
      `${this.aliases[0]}`,
    ];
  }

  public async run(
    message: CommandoMessage,
    { tagName }: { tagName: string },
  ): Promise<Message> {
    // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
    const tag = await Tag.findOne({ where: { name: tagName } });
    if (tag) {
      return message.channel.send(`${tagName} was created by ${tag.username} at ${tag.createdAt.toUTCString()} and has been used ${tag.usage_count} times.`);
    }

    return message.reply(`Could not find tag: ${tagName}`);
  }
}