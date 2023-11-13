import { DataSource } from 'typeorm';
import { Team } from '../app/models/Team';
import { Admin } from '../app/models/Admin';
import { Member } from '../app/models/Member';
import { Message } from '../app/models/Message';

import envs from '../envs';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: envs.DB_NAME,
  entities: [Admin, Team, Message, Member],
  synchronize: true,
  logging: envs.NODE_ENV === 'development'
});

AppDataSource.initialize()
  .then(() => {})
  .catch((error) => console.error(error));
