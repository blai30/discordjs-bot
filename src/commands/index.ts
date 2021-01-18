import { Message } from 'discord.js';
import { help } from './help';
import { ping } from './ping';
import { serverInfo } from './serverInfo';

export const commandList: Command[] = [
  help,
  ping,
  serverInfo,
];

export interface Command {
  aliases: string[],
  description: string,
  category: string,
  usage: string,
  execute: (message: Message, args?: string[]) => Promise<Message>;
}
