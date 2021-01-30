import { Message, MessageEmbed } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';

export default class RrCreateCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'rrcreate',
      aliases: ['rrcreate'],
      group: 'roles',
      memberName: 'rrcreate',
      description: 'Create up a reaction role message.',
    });

    this.examples = [
      `${this.aliases[0]}`,
    ];
  }

  public async run(message: CommandoMessage): Promise<Message> {
    await message.delete();

    const embedOptions = {
      title: 'React to receive or revoke roles.',
      description: '__**Roles**__\n',
    };
    const embed = new MessageEmbed(embedOptions);

    return message.embed(embed);
    //   .then((reply) => {
    //   const filter = (m: Message) => m.author.id === message.author.id;
    //   const collector = message.channel.createMessageCollector(filter);
    //
    //   collector.on('collect', (m: Message) => {
    //     m.delete();
    //     console.log(m.content);
    //     const args = m.content.split(' ');
    //     const reactionRole = message.guild.roles.cache.find((role) => role.name === args[0]);
    //     embed.setDescription(`${embed.description}${args[1]} **${reactionRole.name}**\n`);
    //
    //     reply.react(args[1]);
    //     reply.edit(embed);
    //   });
    //
    //   return reply;
    // });
  }
}
