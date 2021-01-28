import { Message } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { Tag } from '../../models/tag';

export class RemoveTagCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'removetag',
      aliases: ['removetag'],
      group: 'tags',
      memberName: 'removetag',
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
    // equivalent to: DELETE from tags WHERE name = ?;
    const rowCount = await Tag.destroy({ where: { name: tagName } });
    if (!rowCount) {
      return message.reply('That tag did not exist.');
    }

    return message.reply('Tag deleted.');
  }
}
