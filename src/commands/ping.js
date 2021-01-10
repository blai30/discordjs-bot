exports.info = {
  name: 'ping',
  description: 'View the latency of the bot and API.',
  aliases: [],
  usage: 'ping',
};

exports.execute = async (client, message, args) => {
  const msg = await message.channel.send('Ping?');
  msg.edit(`Pong! Latency is \`${msg.createdTimestamp - message.createdTimestamp}ms\`. API Latency is \`${Math.round(client.ws.ping)}ms\`.`);
};
