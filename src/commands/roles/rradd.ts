import { Message } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';

export default class RrAddCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'rradd',
      aliases: ['rradd'],
      group: 'roles',
      memberName: 'rradd',
      description: 'Add a reaction role to a reaction role message.',
      args: [
        {
          key: 'messageId',
          prompt: 'Provide the initial reaction role message to add the reaction role.',
          type: 'string',
        },
        {
          key: 'roleId',
          prompt: 'Provide the server role.',
          type: 'string',
        },
        {
          key: 'emoji',
          prompt: 'Provide the reaction emoji.',
          type: 'string',
        },
      ],
    });

    this.examples = [
      `${this.aliases[0]} <messageId> <roleId> <emoji>`,
    ];
  }

  public async run(
    message: CommandoMessage,
    { messageId, roleId, emoji }: { messageId: string, roleId: string, emoji: string },
  ): Promise<Message> {
    // Check if message is the reaction role message.
    const rrMessage = await message.channel.messages.fetch(messageId);
    if (rrMessage == null || rrMessage.embeds[0] == null) {
      return message.say('That message no longer exists.');
    }

    // Check if role is a valid role.
    const role = await message.guild.roles.fetch(roleId);
    if (role == null) {
      return message.say('Invalid role.');
    }

    // Check if emoji is available within guild.
    // const roleEmoji = this.client.emojis.cache.get(emoji);
    // if (roleEmoji == null) {
    //   return message.say('Invalid emoji.');
    // }

    const embed = rrMessage.embeds[0];
    const desc = embed.description;
    embed.setDescription(`${desc}${emoji} **${role.name}**\\n`);

    return message.say('Success');
  }
}
