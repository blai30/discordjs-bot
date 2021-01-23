import { Message } from 'discord.js';

export interface Command {
  aliases: string[],
  description: string,
  category: string,
  usage: string,
  execute: (message: Message, args?: string[]) => Promise<Message>;
}
