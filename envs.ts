import * as dotenv from 'dotenv';
import * as z from 'zod';

const dotenvConfigOutput = dotenv.config({
  path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

if (dotenvConfigOutput.error) {
  throw dotenvConfigOutput.error;
}

const { parsed: envVariables } = dotenvConfigOutput;

const environmentSchema = z.object({
  PORT: z.string().default('3001'),
  NODE_ENV: z
    .enum(['development', 'production', 'testing'])
    .default('development'),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.string().default('3306'),
  DB_NAME: z.string().min(1),
  DB_USERNAME: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  SECRET: z.string().min(1),
  REDIS_HOST: z.string().min(1),
  REDIS_PORT: z.string().default('6379'),
  ADMIN_USERNAME: z.string().min(1),
  ADMIN_PASSWORD: z.string().min(1),
});

const getParsedEnvVariables = () => environmentSchema.parse(envVariables);

export default getParsedEnvVariables();
