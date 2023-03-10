import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

export const NODE_ENV = configService.getOrThrow<string>('NODE_ENV');
export const APP_PORT = configService.getOrThrow<number>('APP_PORT');
export const POSTGRES_HOST = configService.getOrThrow<string>('POSTGRES_HOST');
export const POSTGRES_DB = configService.getOrThrow<string>('POSTGRES_DB');
export const POSTGRES_USER = configService.getOrThrow<string>('POSTGRES_USER');
export const POSTGRES_PASSWORD = configService.getOrThrow<string>('POSTGRES_PASSWORD');
export const POSTGRES_PORT = configService.getOrThrow<number>('POSTGRES_PORT');
export const DATABASE_LOGGING = JSON.parse(process.env.DATABASE_LOGGING ?? 'false');
export const DATABASE_SYNCHRONIZE = JSON.parse(process.env.DATABASE_SYNCHRONIZE ?? 'false');
export const IS_PROD = NODE_ENV === 'production';
export const IS_TEST = NODE_ENV === 'test';
export const IS_DEV = !IS_TEST && !IS_PROD;
