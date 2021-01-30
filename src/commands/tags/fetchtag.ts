import { Message } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { getConnection } from 'typeorm';
import { Tag } from '../../entity/Tag';

export default class FetchTagCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'fetchtag',
      aliases: ['fetchtag'],
      group: 'tags',
      memberName: 'fetchtag',
      description: 'Fetch a tag.',
      args: [
        {
          key: 'tagName',
          prompt: 'Provide a tag name to fetch.',
          type: 'string',
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
    // SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
    const tagRepository = getConnection().getRepository(Tag);
    const tag = await tagRepository.findOne({ where: { name: tagName } });
    // UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
    await tagRepository.increment({ name: tagName }, 'usage_count', 1);

    if (tag) {
      return message.channel.send(tag.description);
    }

    return message.reply(`Could not find tag: ${tagName}`);
  }
}
