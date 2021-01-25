import { Message, MessageEmbed } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import * as querystring from 'querystring';
import fetch from 'node-fetch';

// Utility function for embed to not error when field value is over max characters.
const trim = (str: string, max: number) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

export class UrbanCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'urban',
      aliases: ['urban'],
      group: 'util',
      memberName: 'urban',
      description: 'Look up a word or phrase on Urban Dictionary.',
      args: [
        {
          key: 'word',
          prompt: 'Specify a word or phrase to look up on Urban Dictionary.',
          type: 'string',
        },
      ],
    });

    this.examples = [
      `${this.aliases[0]}`,
    ];
  }

  public async run(message: CommandoMessage, { word }: { word: string }): Promise<Message> {
    // Turn command args into url query.
    const query = querystring.stringify({ term: word });
    // Fetch json data from api.
    const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<UrbanResponse>;
    });

    const [entry] = list;

    // API does not contain results for specified word.
    if (!list.length) {
      return message.say(`No results found for **${word}**`);
    }

    // Create embed.
    const embedOptions = {
      title: entry.word,
      url: entry.permalink,
      color: 0xefff00,
      author: {
        name: 'Urban Dictionary',
        url: entry.permalink,
      },
      // Reformat a serialized json date to readable date object.
      description: `**Written on:** ${new Date(JSON.parse(`"${entry.written_on}"`)).toUTCString()}`,
      fields: [
        {
          name: 'Definition',
          value: trim(entry.definition, 1024),
        },
        {
          name: 'Example',
          value: trim(entry.example, 1024),
        },
        {
          name: 'Author',
          value: entry.author,
        },
      ],
      footer: {
        text: `👍 ${entry.thumbs_up}\n👎 ${entry.thumbs_down}`,
      },
    };

    return message.embed(new MessageEmbed(embedOptions));
  }
}

/**
 * JSON object received from API that contains an array of results.
 */
interface UrbanResponse {
  list: UrbanEntry[];
}

/**
 * JSON object that contains each result entry from API.
 */
interface UrbanEntry {
  id: number;
  definition: string;
  permalink: string;
  thumbs_up: number;
  thumbs_down: number;
  author: string;
  word: string;
  written_on: string;
  example: string;
}
