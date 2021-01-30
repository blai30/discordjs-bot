import { Message } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { getConnection } from 'typeorm';
import { Tag } from '../../entity/Tag';

export default class EditTagCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'edittag',
      aliases: ['edittag'],
      group: 'tags',
      memberName: 'edittag',
      description: 'Edit a tag.',
      args: [
        {
          key: 'tagName',
          prompt: 'Provide tag name to edit.',
          type: 'string',
        },
        {
          key: 'tagDescription',
          prompt: 'Provide an updated description.',
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
    // UPDATE tags (description) values (?) WHERE name='?';
    const affectedRows = await tagRepository.update(
      { name: tagName },
      { description: tagDescription },
    );

    if (affectedRows.affected > 0) {
      return message.reply(`Tag ${tagName} was edited.`);
    }
    return message.reply(`Could not find a tag with name ${tagName}.`);
  }
}
