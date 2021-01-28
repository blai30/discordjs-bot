import { Message } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { Tag } from '../../models/tag';

export class AddTagCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'addtag',
      aliases: ['addtag'],
      group: 'tags',
      memberName: 'addtag',
      description: 'Adds a tag.',
      args: [
        {
          key: 'tagName',
          type: 'string',
          prompt: 'Provide tag name to add.',
        },
        {
          key: 'tagDescription',
          type: 'string',
          prompt: 'Provide a description.',
        },
      ],
    });

    this.examples = [
      `${this.aliases[0]}`,
    ];
  }

  public async run(
    message: CommandoMessage,
    { tagName, tagDescription }: { tagName: string, tagDescription: string },
  ): Promise<Message> {
    try {
      // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
      const tag = await Tag.create({
        name: tagName,
        description: tagDescription,
        username: message.author.username,
      });
      return message.reply(`Tag ${tag.name} added.`);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (e.name === 'SequelizeUniqueConstraintError') {
        return message.reply('That tag already exists.');
      }
      return message.reply('Something went wrong with adding a tag.');
    }
  }
}
