import { Message } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';

export class PingCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'ping',
      aliases: ['ping'],
      group: 'general',
      memberName: 'ping',
      description: 'View the latency of the bot and API.',
    });

    this.examples = [
      `${this.aliases[0]}`,
    ];
  }

  public async run(message: CommandoMessage): Promise<Message> {
    const text = 'Pong! Latency: `... ms`. API: `... ms`.';

    return message.say(text).then((reply) => {
      const latency = reply.createdTimestamp - message.createdTimestamp;
      const botLatency = message.client.ws.ping;
      return reply.edit(`Pong! Latency: \`${latency} ms\`. API: \`${botLatency} ms\`.`);
    });
  }
}
