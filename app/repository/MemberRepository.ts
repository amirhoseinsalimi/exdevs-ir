import type { UpdateResult } from 'typeorm';
import { Member } from '../models/Member';
import { AppDataSource } from '../../database';

export const MemberRepository = AppDataSource.manager.getRepository(Member);

export default MemberRepository;
