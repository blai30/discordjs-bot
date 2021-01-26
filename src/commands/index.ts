import { Command } from 'discord.js-commando';

import { AvatarCommand } from './util/avatar';
import { FlipCoinCommand } from './fun/flipcoin';
import { HelpCommand } from './general/help';
import { PingCommand } from './general/ping';
import { RrCreateCommand } from './roles/rrcreate';
import { ServerInfoCommand } from './util/serverinfo';
import { UrbanCommand } from './util/urban';
import { UserInfoCommand } from './util/userinfo';

export const commandList: (typeof Command)[] = [
  AvatarCommand,
  FlipCoinCommand,
  HelpCommand,
  PingCommand,
  RrCreateCommand,
  ServerInfoCommand,
  UrbanCommand,
  UserInfoCommand,
];
