import { Message } from 'discord.js';

export const name = 'ping';

export const description = 'View the latency of the bot and API.';

export const category = 'info';

export const aliases = [];

export const usage = 'ping';

export const execute = async (message: Message): Promise<Message> => {
  const reply = await message.channel.send('Ping?');
  return reply.edit(`Pong! Latency is \`${reply.createdTimestamp - message.createdTimestamp}ms\`. API Latency is \`${Math.round(message.client.ws.ping)}ms\`.`);
}
