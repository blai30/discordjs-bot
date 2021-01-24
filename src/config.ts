import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export const token = process.env.DISCORD_TOKEN || 'unknown';

export const owner = process.env.OWNER || 'unknown';

export const prefix = process.env.BOT_PREFIX || '<@!547507928287019009> ';

export const embedColor = process.env.DEFAULT_COLOR || 0x000000;

export const inviteUrl = process.env.INVITE || '';

export const paths = {
  commands: path.join(__dirname, 'commands'),
  events: path.join(__dirname, 'events'),
};

export const environment = process.env.NODE_ENV || 'unknown';
