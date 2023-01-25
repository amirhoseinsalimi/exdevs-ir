import type { UpdateResult } from 'typeorm';
import { Message } from '../models/Message';
import { AppDataSource } from '../../database';

export const MessageRepository = AppDataSource.manager.getRepository(Message);

export default MessageRepository;
