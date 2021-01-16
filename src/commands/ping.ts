import { Message } from 'discord.js';
import { Command } from './index';

const aliases = ['ping'];

const description = 'View the latency of the bot and API.';

const category = 'info';

const usage = aliases[0];

const execute = async (message: Message): Promise<Message> => {
  const reply = await message.channel.send('Ping?');
  return reply.edit(`Pong! Latency is \`${reply.createdTimestamp - message.createdTimestamp}ms\`. API Latency is \`${Math.round(message.client.ws.ping)}ms\`.`);
}

export const ping: Command = {
  aliases: aliases,
  description: description,
  category: category,
  usage: usage,
  execute: execute,
};
