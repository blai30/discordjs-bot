import { Message } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { getConnection } from 'typeorm';
import { Tag } from '../../entity/Tag';

export default class TagInfoCommand extends Command {
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
          prompt: 'Provide a tag name to display tag info.',
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
    const tagRepository = getConnection().getRepository(Tag);
    // SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
    const tag = await tagRepository.findOne({ where: { name: tagName } });
    if (tag) {
      return message.channel.send(`${tagName} was created by ${tag.user_id} at ${tag.createdAt.toUTCString()} and has been used ${tag.usage_count} times.`);
    }

    return message.reply(`Could not find tag: ${tagName}`);
  }
}
