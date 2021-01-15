import { Message } from 'discord.js';

export interface Command {
  name: string,
  description: string,
  category: string,
  aliases?: string[],
  usage?: string,
  execute: (message: Message, args: string[]) => Promise<Message>;
}
