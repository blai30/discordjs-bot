import { createConnection } from 'typeorm';
import { dbConfig } from '../config';
import { Tag } from '../entity/tag';

export const db = createConnection({
  type: 'mysql',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [
    Tag,
  ],
  synchronize: true,
  logging: false,
});
