import { Message } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { Tag } from '../../models/tag';

export class EditTagCommand extends Command {
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
          type: 'string',
          prompt: 'Provide tag name to edit.',
        },
        {
          key: 'tagDescription',
          type: 'string',
          prompt: 'Provide an updated description.',
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
    // equivalent to: UPDATE tags (description) values (?) WHERE name='?';
    const affectedRows = await Tag.update(
      { description: tagDescription },
      { where: { name: tagName } },
    );

    // @ts-ignore
    if (affectedRows > 0) {
      return message.reply(`Tag ${tagName} was edited.`);
    }
    return message.reply(`Could not find a tag with name ${tagName}.`);
  }
}
