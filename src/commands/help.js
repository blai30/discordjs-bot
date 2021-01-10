const { MessageEmbed } = require('discord.js');
const {
  prefix, embedColor,
} = require('../config');

module.exports = {
  name: 'help',
  description: 'View all commands.',
  aliases: ['h', 'halp'],
  usage: 'help',
  execute: async (client, message, args) => {
    const perms = message.guild.me.permissions;
    // if (!perms.has('EMBED_LINKS')) return noBotPerms(message, 'EMBED_LINKS');

    const commands = Array.from(client.commands.keys());
    const command = args[0];

    const cmdName = client.commands.get('help');

    if (command) {
      const commandObject = client.commands.get(command)
        || client.commands.get(client.aliases.get(command));
      if (!commandObject) return;
      const commandHelp = commandObject.help;

      const commandHelpEmbed = new MessageEmbed()
        .setTitle(`${commandHelp.name} | Help Information`)
        .setDescription(commandHelp.description)
        .addField('Usage', `\`${commandHelp.usage}\``, true)
        .setColor(embedColor);

      if (commandHelp.aliases.length) commandHelpEmbed.addField('Aliases', `\`${commandHelp.aliases.join(', ')}\``, true);

      await message.channel.send(commandHelpEmbed);
    }

    const helpCommands = commands.map((cmd) => `\`${cmd}\``);

    client.logger.info(embedColor);

    const helpEmbed = new MessageEmbed()
      .setColor(embedColor)
      .setTitle('Help Information')
      .setDescription(`View help information for ${client.user}.\nEnter \`${prefix + cmdName} <command>\` for command info.`)
      .setThumbnail(client.user.avatarURL())
      .addFields(
        {
          name: 'Current prefix',
          value: prefix,
        },
        {
          name: 'Bot commands',
          value: helpCommands.join(', '),
        },
      );

    await message.channel.send(helpEmbed);
  },
};
