import { Message } from 'discord.js';
import { Command } from '../structures/command';

const aliases = ['ping'];

const description = 'View the latency of the bot and API.';

const category = 'info';

const usage = aliases[0];

const execute = async (message: Message): Promise<Message> => {
  const text = 'Pong! Latency: `... ms`. API: `... ms`.';

  return message.channel.send(text).then((reply) => {
    const latency = reply.createdTimestamp - message.createdTimestamp;
    const botLatency = message.client.ws.ping;
    return reply.edit(`Pong! Latency: \`${latency} ms\`. API: \`${botLatency} ms\`.`);
  });
};

export const ping: Command = {
  aliases,
  description,
  category,
  usage,
  execute,
};
