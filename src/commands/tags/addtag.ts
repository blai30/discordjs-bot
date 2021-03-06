import { Message } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { getConnection } from 'typeorm';
import { Tag } from '../../entity/Tag';

export default class AddTagCommand extends Command {
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
          prompt: 'Provide tag name to add.',
          type: 'string',
        },
        {
          key: 'tagDescription',
          prompt: 'Provide a description.',
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
    { tagName, tagDescription }: { tagName: string, tagDescription: string },
  ): Promise<Message> {
    const tagRepository = getConnection().getRepository(Tag);
    // INSERT INTO tags (name, description, username) values (?, ?, ?);
    const tag = new Tag();
    tag.name = tagName;
    tag.description = tagDescription;
    tag.user_id = message.author.id;
    await tagRepository.save(tag);

    return message.reply(`Tag ${tag.name} added.`);
  }
}
