import { Connection, createConnection } from 'typeorm';

export const initConnection = (): Promise<Connection> => createConnection();
// createConnection({
//   type: 'mysql',
//   host: dbConfig.host,
//   port: dbConfig.port,
//   username: dbConfig.username,
//   password: dbConfig.password,
//   database: dbConfig.database,
//   synchronize: true,
//   logging: false,
//   entities: [
//     Tag,
//   ],
// });
