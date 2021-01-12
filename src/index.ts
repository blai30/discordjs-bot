require('dotenv').config();

import BotClient from './structures/BotClient';
import { paths, token } from './config';

const client = new BotClient({});

client.loadCommands(paths.commands);
client.loadEvents(paths.events);

client.login(token);
