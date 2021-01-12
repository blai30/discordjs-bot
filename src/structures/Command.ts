import { Message } from 'discord.js';
import BotClient from './BotClient';

interface CommandOptions {
  readonly help: {
    name: string,
    description: string,
    category: string,
    aliases?: string[],
    usage?: string
  };
}

abstract class Command {
  public client: BotClient;

  public name: string;

  public description: string;

  public category: string;

  public aliases: string[];

  public usage: string;

  public message?: Message;

  protected constructor(client: BotClient, { help }: CommandOptions) {
    this.client = client;

    this.name = help.name;
    this.description = help.description;
    this.category = help.category || 'info';
    this.aliases = help.aliases || [];
    this.usage = help.usage || '';
  }

  abstract execute(client: BotClient, message: Message, args: string[]): Promise<Message>;
}

export default Command;
