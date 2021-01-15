import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  token: process.env.DISCORD_TOKEN || 'unknown',
  owner: process.env.OWNER || 'unknown',
  prefix: process.env.BOT_PREFIX || '<@!547507928287019009> ',
  embedColor: process.env.DEFAULT_COLOR || '0x000000',
  paths: {
    commands: `${__dirname}/commands`,
    events: `${__dirname}/events`,
  },
  environment: process.env.NODE_ENV || 'unknown',
};
