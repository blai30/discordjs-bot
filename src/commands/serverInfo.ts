import { Message } from 'discord.js';

export const name = 'server-info';

export const description = 'Display server info.';

export const category = 'info';

export const aliases = [];

export const usage = 'server-info';

export const execute = async (message: Message): Promise<Message> => {
  return message.channel.send(
    `Server name: ${message.guild.name}\nCreated on: ${message.guild.createdAt}\nTotal members: ${message.guild.memberCount}`,
  );
}
