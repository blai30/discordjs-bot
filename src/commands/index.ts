import { Command } from 'discord.js-commando';

import { AvatarCommand } from './util/avatar';
import { FlipCoinCommand } from './fun/flipcoin';
import { HelpCommand } from './general/help';
import { PingCommand } from './general/ping';
import { ServerInfoCommand } from './util/serverinfo';
import { UserInfoCommand } from './util/userinfo';

export const commandList: (typeof Command)[] = [
  AvatarCommand,
  FlipCoinCommand,
  HelpCommand,
  PingCommand,
  ServerInfoCommand,
  UserInfoCommand,
];
