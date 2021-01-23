import { Command } from '../structures/command';

import { avatar } from './avatar';
// eslint-disable-next-line import/no-cycle
import { help } from './help';
import { ping } from './ping';
import { serverInfo } from './serverInfo';
import { userInfo } from './userInfo';

export const commandList: Command[] = [
  avatar,
  help,
  ping,
  serverInfo,
  userInfo,
];
