import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

export const NODE_ENV = configService.getOrThrow<string>('NODE_ENV');
export const APP_PORT = configService.getOrThrow<number>('APP_PORT');
export const IS_PROD = NODE_ENV === 'production';
export const IS_TEST = NODE_ENV === 'test';
export const IS_DEV = !IS_TEST && !IS_PROD;
