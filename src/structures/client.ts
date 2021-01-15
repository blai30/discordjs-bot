import { Client as discordClient } from 'discord.js';
import * as fs from 'fs';
import { Command } from './command';
import { logger } from '../utils/logger';

enum PrivilegedIntents {
  GUILD_PRESENCES = 'GUILD_PRESENCES',
  GUILD_MEMBERS = 'GUILD_MEMBERS',
}

/**
 * Extended class from discord.js Client with additional methods and default constructor.
 */
export class Client extends discordClient {
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
    return fs.promises.readdir(path).then((files) => {
      const commandFiles = files.filter((file) => file.endsWith('.js'));

      commandFiles.map(async (file) => {
        // Load command module.
        const command = await import(`${path}/${file}`) as Command;

        // Add commands and their aliases to the collection.
        command.aliases.forEach((alias: string) => {
          this.commands.set(alias, command);
        });

        logger.info(`Loaded command: "${file}" with ${!command.aliases ? 0 : command.aliases.length} aliases.`);
      })

      logger.info(`Loaded a total of ${commandFiles.length} commands.`);
    });
  }
}
