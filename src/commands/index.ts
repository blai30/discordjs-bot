import { Command } from 'discord.js-commando';

import { AvatarCommand } from './util/avatar';
import { ServerInfoCommand } from './info/serverInfo';
import { UserInfoCommand } from './info/userInfo';

export const commandList: (typeof Command)[] = [
  AvatarCommand,
  ServerInfoCommand,
  UserInfoCommand,
];
