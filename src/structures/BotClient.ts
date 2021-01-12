import fs from 'fs';
import { Client, ClientOptions, Collection } from 'discord.js';
import { Logger } from 'winston';

import Command from './Command';
import logger from '../utils/logger';

/**
 * Client used for the discord bot that is derived from Discord.JS Client.
 */
class BotClient extends Client {
  public commands: Collection<string, Command>;

  public aliases: Collection<string, string>;

  public logger: Logger;

  /**
   * Create client object and initialize fields.
   * @param options
   */
  constructor(options: ClientOptions) {
    super(options || {});

    this.commands = new Collection();
    this.aliases = new Collection();
    this.logger = logger;
  }

  /**
   * Load command modules into client.
   * @param path
   */
  loadCommands(path: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      // Load client commands.
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
          command.aliases.forEach((alias: string) => this.aliases.set(alias, command.name));
          this.logger.info(`Loaded command: "${file}" with ${command.aliases.length} aliases.`);
        });

        return resolve();
      });
    });
  }

  /**
   * Load event modules into client.
   * @param path
   */
  loadEvents(path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Load client events.
      fs.readdir(path, (err, files) => {
        if (err) {
          return reject(err);
        }

        const eventFiles = files.filter((file) => file.endsWith('.js'));
        eventFiles.forEach(async (file) => {
          // Load event module.
          const event = await import(`${path}/${file}`);
          // Register socket event listener.
          this.on(event.name, event.bind(null, this));
          this.logger.info(`Loaded event: "${event.name}".`);
        });

        return resolve();
      });
    });
  }
}

export default BotClient;
