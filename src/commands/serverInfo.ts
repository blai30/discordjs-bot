import { Message } from 'discord.js';
import { Command } from './index';

const aliases = ['server-info'];

const description = 'Display server info.';

const category = 'info';

const usage = aliases[0];

const execute = async (message: Message): Promise<Message> => {
  const reply = `Server name: ${message.guild.name}\nCreated on: ${message.guild.createdAt.toString()}\nTotal members: ${message.guild.memberCount}`;
  return message.channel.send(reply);
};

export const serverInfo: Command = {
  aliases: aliases,
  description: description,
  category: category,
  usage: usage,
  execute: execute,
}
