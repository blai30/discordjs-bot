import { Command } from 'discord.js-commando';

import { AvatarCommand } from './util/avatar';
import { HelpCommand } from './util/help';
import { PingCommand } from './util/ping';
import { ServerInfoCommand } from './util/serverinfo';
import { UserInfoCommand } from './util/userinfo';

export const commandList: (typeof Command)[] = [
  AvatarCommand,
  HelpCommand,
  PingCommand,
  ServerInfoCommand,
  UserInfoCommand,
];
