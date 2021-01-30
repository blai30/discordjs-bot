import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export const token = process.env.DISCORD_TOKEN || 'undefined';

export const prefix = process.env.BOT_PREFIX || null;

export const owner = process.env.OWNER || 'undefined';

export const embedColor = process.env.DEFAULT_COLOR || 0x000000;

export const inviteUrl = process.env.INVITE || '';

export const paths = {
  commands: path.join(__dirname, 'commands'),
  events: path.join(__dirname, 'events'),
};

export const environment = process.env.NODE_ENV || 'undefined';

export const dbConfig = {
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};
