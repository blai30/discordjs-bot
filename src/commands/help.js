module.exports = {
  name: 'help',
  description: 'View bot commands.',
  aliases: [],
  usage: 'help',
  execute: async (client, message, args) => {
    await message.channel.send('Helping...');
  },
};
