import { Command } from '../structures/commands';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>;
    aliases: Collection<string, string>;
  }
}
