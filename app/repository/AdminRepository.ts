import type { UpdateResult } from 'typeorm';
import { AppDataSource } from '../../database';
import { Admin } from '../models/Admin';

export const AdminRepository = AppDataSource.manager.getRepository(Admin);

export default AdminRepository;
