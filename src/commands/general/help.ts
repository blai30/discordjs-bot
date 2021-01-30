import { Message, MessageEmbed } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { embedColor, inviteUrl } from '../../config';

const links = [
  `[Invite me](${inviteUrl})`,
  `[Invite me](${inviteUrl})`,
];

export default class HelpCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'help',
      aliases: ['help', 'h', 'halp'],
      group: 'general',
      memberName: 'help',
      description: 'View all commands or help info for a specific command.',
      args: [
        {
          key: 'name',
          prompt: 'Include a command name to view help info for that command.',
          type: 'string',
          default: '',
        },
      ],
    });

    this.examples = [
      `${this.aliases[0]} [command]`,
    ];
  }

  public async run(message: CommandoMessage, { name }: { name: string }): Promise<Message> {
    const clientUser = this.client.user;
    const avatar = clientUser.avatarURL({ dynamic: true });
    const commandGroups = this.client.registry.groups.sort((group1, group2) => {
      // Sort command groups alphabetically by group id.
      const id1 = group1.id.toUpperCase();
      const id2 = group2.id.toUpperCase();
      return id1.localeCompare(id2);
    });

    // Create the message embed for help.
    const embedOptions = {
      color: embedColor,
      thumbnail: {
        url: avatar,
      },
    };

    const embed = new MessageEmbed(embedOptions);

    /**
     * No command name is provided from command arguments, display default help.
     */
    if (!name) {
      embed
        .setAuthor(clientUser.username, avatar)
        .setDescription(`View available commands for ${clientUser.toString()}.
        Enter \`@${clientUser.username} ${this.aliases[0]} [command]\` for command help info.`);

      // List all available commands separated by command groups.
      commandGroups.forEach((group) => {
        // Skip groups that do not have commands.
        if (group.commands.size <= 0) {
          return;
        }

        const groupCommandNames = group.commands.map((command) => `\`${command.name}\``);
        embed.addField(group.name, groupCommandNames.join(', '));
      });

      embed.addField('Examples', `\`@${message.client.user.username} help avatar\` to view help for the avatar command.`);
      embed.addField('Useful links', links.join(', '));

      return message.embed(embed);
    }

    /**
     * Display help info for command specified in arguments.
     */
    const command = this.client.registry.commands.get(name);
    embed
      .setTitle(command.name)
      .setDescription(command.description);

    // List all usage examples if there are any, separated by new line.
    if (command.examples.length > 0) {
      const examples = command.examples.map((example) => `${clientUser.toString()} ${example}`);
      embed.addField('Usage', examples.join('\n'));
    }

    // List command aliases.
    embed.addField('Aliases', `\`${command.aliases.join(', ')}\``);

    return message.embed(embed);
  }
}
