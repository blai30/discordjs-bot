import { Message } from 'discord.js';
import Command from '../structures/Command';
import BotClient from '../structures/BotClient';

export default class extends Command {
  constructor(client: BotClient) {
    super(client, {
      help: {
        name: 'ping',
        description: 'View the latency of the bot and API.',
        category: 'info',
        aliases: [],
        usage: 'ping',
      },
    });
  }

  async execute(client: BotClient, message: Message, args: string[]): Promise<Message> {
    const reply = await message.channel.send('Ping?');
    return reply.edit(`Pong! Latency is \`${reply.createdTimestamp - message.createdTimestamp}ms\`. API Latency is \`${Math.round(this.client.ws.ping)}ms\`.`);
  }
}
