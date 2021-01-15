import { Client } from 'discord.js';
import * as fs from 'fs';
import { Command } from './commands';
import { logger } from '../utils/logger';

enum PrivilegedIntents {
  GUILD_PRESENCES = 'GUILD_PRESENCES',
  GUILD_MEMBERS = 'GUILD_MEMBERS',
}

/**
 * Extended class from discord.js Client with additional methods and default constructor.
 */
export default class extends Client {
  constructor() {
    super({
      partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
      ws: {
        intents: [
          'GUILDS',
          'GUILD_MESSAGES',
          'GUILD_MESSAGE_REACTIONS',
          PrivilegedIntents.GUILD_MEMBERS,
        ],
      },
    });
  }

  /**
   * Load client commands.
   * @param path The path to the command modules directory.
   */
  async loadCommands(path: string): Promise<void> {
    return new Promise<void>(((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) {
          return reject(err);
        }

        const commandFiles = files.filter((file) => file.endsWith('.js'));

        commandFiles.forEach(async (file) => {
          // Load command module.
          const command = await import(`${path}/${file}`) as Command;

          // Add commands and their aliases to the collections.
          // Set new item in collection with command name as key and exported module as value.
          this.commands.set(command.name, command);
          if (command.aliases) {
            command.aliases.forEach((alias: string) => this.aliases.set(alias, command.name));
          }
          logger.info(`Loaded command: "${file}" with ${!command.aliases ? 0 : command.aliases.length} aliases.`);
        });
      });

      return resolve();
    }));
  }
}
