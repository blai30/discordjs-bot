import { Command } from 'discord.js-commando';

import { FlipCoinCommand } from './fun/flipcoin';

import { HelpCommand } from './general/help';
import { PingCommand } from './general/ping';

import { RrCreateCommand } from './roles/rrcreate';

import { AddTagCommand } from './tags/addtag';
import { EditTagCommand } from './tags/edittag';
import { FetchTagCommand } from './tags/fetchtag';
import { RemoveTagCommand } from './tags/removetag';
import { ShowTagsCommand } from './tags/showtags';
import { TagInfoCommand } from './tags/taginfo';

import { AvatarCommand } from './util/avatar';
import { ServerInfoCommand } from './util/serverinfo';
import { UrbanCommand } from './util/urban';
import { UserInfoCommand } from './util/userinfo';

export const commandList: (typeof Command)[] = [
  // fun
  FlipCoinCommand,

  // general
  HelpCommand,
  PingCommand,

  // roles
  RrCreateCommand,

  // tags
  AddTagCommand,
  EditTagCommand,
  FetchTagCommand,
  RemoveTagCommand,
  ShowTagsCommand,
  TagInfoCommand,

  // util
  AvatarCommand,
  ServerInfoCommand,
  UrbanCommand,
  UserInfoCommand,
];
