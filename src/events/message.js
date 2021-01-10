const { prefix } = require('../config');

module.exports = async (client, message) => {
  // Make sure the message was sent in a guild and not direct message.
  if (!message.guild) {
    return;
  }
  // Make sure the message contains the command prefix from the config.json.
  if (!message.content.startsWith(prefix)) {
    return;
  }
  // Make sure the message author isn't a bot.
  if (message.author.bot) {
    return;
  }

  // Example: !args-info here are my arguments
  // Command: args-info
  // Arguments: ["here", "are", "my", "arguments"]
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  // Identify command by its name or an alias.
  const command = client.commands.get(commandName)
    || client.commands.get(client.aliases.get(commandName));

  // Not a valid command.
  if (!command) {
    return;
  }

  await command.execute(client, message, args);
};
