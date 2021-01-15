import { Command } from '../structures/command';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>;
  }
}
