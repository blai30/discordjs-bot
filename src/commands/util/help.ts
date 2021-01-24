import { Message, MessageEmbed } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { embedColor, inviteUrl } from '../../config';

const links = [
  `[Invite me](${inviteUrl})`,
  `[Invite me](${inviteUrl})`,
];

export class HelpCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'help',
      aliases: ['help', 'h', 'halp'],
      group: 'util',
      memberName: 'help',
      description: 'View all commands or help info for a specific command.',
    });

    this.examples = [`${this.aliases[0]} [command]`];
  }

  public run(message: CommandoMessage): Promise<Message> {
    const clientUser = this.client.user;
    const avatar = this.client.user.avatarURL({ dynamic: true });
    const commandNames = this.client.registry.commands.map((command) => `\`${command.name}\``);

    // Create the message embed for help.
    const embedOptions = {
      author: {
        name: clientUser.username,
        icon_url: avatar,
      },
      color: embedColor,
      thumbnail: {
        url: avatar,
      },
      description: `View available commands for ${clientUser.toString()}.
                  Enter \`@${clientUser.username} ${this.aliases[0]} [command]\` for command help info.`,
      fields: [
        {
          name: 'Available commands',
          value: commandNames.sort().join(', '),
        },
        {
          name: 'Examples',
          value: `\`@${message.client.user.username} help avatar\` to view help for the avatar command.`,
        },
        {
          name: 'Useful links:',
          value: links.join(', '),
        },
      ],
    };

    return message.embed(new MessageEmbed(embedOptions));
  }
}
