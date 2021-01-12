import { Message, MessageEmbed } from 'discord.js';
import BotClient from '../structures/BotClient';
import Command from '../structures/Command';
import { embedColor, prefix } from '../config';

export default class extends Command {
  constructor(client: BotClient) {
    super(client, {
      help: {
        name: 'help',
        description: 'View all commands.',
        category: 'info',
        aliases: ['h', 'halp'],
        usage: 'help',
      },
    });
  }

  async execute(client: BotClient, message: Message, args: string[]): Promise<Message> {
    const commands = Array.from(client.commands.keys());
    const command = args[0];

    const helpCommandName = client.commands.get('help').name;

    if (command) {
      const commandObject = client.commands.get(command)
        || client.commands.get(<string> client.aliases.get(command));

      // Not a valid command.
      if (!commandObject) {
        return;
      }

      // Create message embed for the command help information.
      const commandHelpEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setTitle(`${commandObject.name} | Help`)
        .setDescription(commandObject.description)
        .addField('Usage', `\`${commandObject.usage}\``, true);

      const avatar = client.user.avatarURL();
      if (avatar) {
        commandHelpEmbed.setThumbnail(avatar);
      }

      // List any available aliases for the command.
      if (commandObject.aliases.length) {
        commandHelpEmbed.addField('Aliases', `\`${commandObject.aliases.join(', ')}\``, true);
      }

      await message.channel.send(commandHelpEmbed);
    } else {
      const helpCommands = commands.map((cmd) => `\`${cmd}\``);

      // Create the message embed for help.
      const helpEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setTitle('Help information')
        .setDescription(`View help information for ${client.user}.\nEnter \`${helpCommandName} <command>\` for command info.`)
        .addFields(
          {
            name: 'Executing commands',
            value: `Mention ${client.user} followed by the command.\n\`eg. @${client.user.username} help\``,
          },
          {
            name: 'Available commands',
            value: helpCommands.join(', '),
          },
        );

      const avatar = client.user.avatarURL();
      if (avatar) {
        helpEmbed.setThumbnail(avatar);
      }

      await message.channel.send(helpEmbed);
    }
  }
}
