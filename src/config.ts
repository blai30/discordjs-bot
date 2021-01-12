const config = {
  token: process.env.DISCORD_TOKEN || 'unknown',
  owner: process.env.OWNER || 'unknown',
  prefix: process.env.BOT_PREFIX || 'unknown',
  embedColor: process.env.DEFAULT_COLOR || 'unknown',
  paths: {
    commands: 'src/commands',
    events: 'src/events',
  },
  environment: process.env.NODE_ENV || 'unknown',
};

export = config;
