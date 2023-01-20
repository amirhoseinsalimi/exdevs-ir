import { DataSource } from 'typeorm';
import { Team } from '../app/models/Team';
import { Admin } from '../app/models/Admin';
import { Member } from '../app/models/Member';
import { Message } from '../app/models/Message';

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
} = require('../env');

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [Admin, Team, Message, Member],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {})
  .catch((error) => console.log(error));
