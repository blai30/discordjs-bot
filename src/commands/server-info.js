module.exports = {
  name: 'server-info',
  description: 'Display server info.',
  aliases: [],
  usage: 'ping',
  execute: async (client, message, args) => {
    message.channel.send(
      `Server name: ${message.guild.name}\nCreated on: ${message.guild.createdAt}\nTotal members: ${message.guild.memberCount}`,
    );
  },
};
