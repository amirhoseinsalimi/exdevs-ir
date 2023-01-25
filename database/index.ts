import { DataSource } from 'typeorm';
import { Team } from '../app/models/Team';
import { Admin } from '../app/models/Admin';
import { Member } from '../app/models/Member';
import { Message } from '../app/models/Message';

import envs from '../envs';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: envs.DB_HOST,
  port: Number(envs.DB_PORT),
  username: envs.DB_USERNAME,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  entities: [Admin, Team, Message, Member],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {})
  .catch((error) => console.error(error));
