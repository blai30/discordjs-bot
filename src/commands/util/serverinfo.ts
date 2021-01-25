import { Message, MessageEmbed } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { embedColor } from '../../config';

export class ServerInfoCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'serverinfo',
      aliases: ['serverinfo'],
      group: 'util',
      memberName: 'serverinfo',
      description: 'Display information about the server.',
    });

    this.examples = [
      `${this.aliases[0]}`,
    ];
  }

  public async run(message: CommandoMessage): Promise<Message | Message[] | null> | null {
    const channels = message.guild.channels.cache;
    const emojis = message.guild.emojis.cache;
    const roles = message.guild.roles.cache;
    const guildIconUrl = message.guild.iconURL({ dynamic: true });

    const embedOptions = {
      title: 'Icon direct link',
      url: guildIconUrl,
      author: {
        name: message.guild.name,
        icon_url: guildIconUrl,
      },
      description: `Owner: ${message.guild.owner.user.toString()}`,
      color: embedColor,
      thumbnail: {
        url: guildIconUrl,
      },
      footer: {
        text: `Created: ${message.guild.createdAt.toUTCString()}`,
      },
      fields: [
        {
          name: 'ID',
          value: message.guild.id,
          inline: true,
        },
        {
          name: 'Region',
          value: message.guild.region,
          inline: true,
        },
        {
          name: 'Members',
          value: message.guild.memberCount,
          inline: true,
        },
        {
          name: 'Channels',
          value: `${channels.filter((channel) => channel.type === 'text').size} text
                ${channels.filter((channel) => channel.type === 'voice').size} voice`,
          inline: true,
        },
        {
          name: 'Emojis',
          value: `${emojis.filter((emoji) => !emoji.animated).size} static
                ${emojis.filter((emoji) => emoji.animated).size} animated`,
          inline: true,
        },
        {
          name: 'Premium',
          value: `Level ${message.guild.premiumTier}
                ${message.guild.premiumSubscriptionCount} boosts`,
          inline: true,
        },
        {
          name: `Roles: ${roles.size}`,
          value: `${roles.map((role) => role.name).sort().join(', ')}`,
          inline: false,
        },
      ],
    };

    return message.embed(new MessageEmbed(embedOptions));
  }
}
