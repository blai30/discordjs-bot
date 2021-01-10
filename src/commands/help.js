const { MessageEmbed } = require('discord.js');
const {
  prefix, embedColor,
} = require('../config');

exports.info = {
  name: 'help',
  description: 'View all commands.',
  aliases: ['h', 'halp'],
  usage: 'help',
};

exports.execute = async (client, message, args) => {
  const perms = message.guild.me.permissions;
  // if (!perms.has('EMBED_LINKS')) return noBotPerms(message, 'EMBED_LINKS');

  const commands = Array.from(client.commands.keys());
  const command = args[0];

  const helpCommandName = client.commands.get('help').name;

  if (command) {
    const commandObject = client.commands.get(command)
      || client.commands.get(client.aliases.get(command));

    // Not a valid command.
    if (!commandObject) {
      return;
    }

    // Help information of the command.
    const commandInfo = commandObject.info;

    // Create message embed for the command help information.
    const commandHelpEmbed = new MessageEmbed()
      .setColor(embedColor)
      .setTitle(`${commandInfo.name} | Help`)
      .setDescription(commandInfo.description)
      .setThumbnail(client.user.avatarURL())
      .addField('Usage', `\`${commandInfo.usage}\``, true);

    // List any available aliases for the command.
    if (commandInfo.aliases.length) {
      commandHelpEmbed.addField('Aliases', `\`${commandInfo.aliases.join(', ')}\``, true);
    }

    await message.channel.send(commandHelpEmbed);
  } else {
    const helpCommands = commands.map((cmd) => `\`${cmd}\``);

    // Create the message embed for help.
    const helpEmbed = new MessageEmbed()
      .setColor(embedColor)
      .setTitle('Help information')
      .setDescription(`View help information for ${client.user}.\nEnter \`${helpCommandName} <command>\` for command info.`)
      .setThumbnail(client.user.avatarURL())
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

    await message.channel.send(helpEmbed);
  }
};
