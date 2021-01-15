import { Message } from 'discord.js';

export const aliases = ['server-info'];

export const description = 'Display server info.';

export const category = 'info';

export const usage = aliases[0];

export const execute = async (message: Message): Promise<Message> => {
  const reply = `Server name: ${message.guild.name}\nCreated on: ${message.guild.createdAt.toString()}\nTotal members: ${message.guild.memberCount}`;
  return message.channel.send(reply);
};
