import { Message } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { Tag } from '../../models/tag';

export class ShowTagsCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'showtags',
      aliases: ['showtags'],
      group: 'tags',
      memberName: 'showtags',
      description: 'List all tags.',
    });

    this.examples = [
      `${this.aliases[0]}`,
    ];
  }

  public async run(message: CommandoMessage): Promise<Message> {
    // equivalent to: SELECT name FROM tags;
    const tagList = await Tag.findAll({ attributes: ['name'] });
    const tagString = tagList.map((tag) => tag.name).join(', ') || 'No tags set.';
    return message.channel.send(`List of tags: ${tagString}`);
  }
}
