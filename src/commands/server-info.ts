import { Message } from 'discord.js';
import Command from '../structures/Command';
import BotClient from '../structures/BotClient';

export default class extends Command {
  constructor(client: BotClient) {
    super(client, {
      help: {
        name: 'server-info',
        description: 'Display server info.',
        category: 'info',
        aliases: [],
        usage: 'server-info',
      },
    });
  }

  async execute(client: BotClient, message: Message, args: string[]): Promise<Message> {
    return message.channel.send(
      `Server name: ${message.guild.name}\nCreated on: ${message.guild.createdAt}\nTotal members: ${message.guild.memberCount}`,
    );
  }
}
