import type { UpdateResult } from 'typeorm';
import { Team } from '../models/Team';
import { AppDataSource } from '../../database';

export const TeamRepository = AppDataSource.manager.getRepository(Team);

export default TeamRepository;
