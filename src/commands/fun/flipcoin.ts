import { Message } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';

export class FlipCoinCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'flipcoin',
      aliases: ['flipcoin'],
      group: 'fun',
      memberName: 'flipcoin',
      description: 'Flips a 50/50 heads/tails coin.',
    });

    this.examples = [
      `${this.aliases[0]}`,
    ];
  }

  public async run(message: CommandoMessage): Promise<Message> {
    // Generates a random number 0 or 1.
    const coin = Math.round(Math.random());
    return message.say(coin ? 'Heads!' : 'Tails!');
  }
}
