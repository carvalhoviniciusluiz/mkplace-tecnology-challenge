import { CacheModuleOptions, CacheOptionsFactory, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return {
      ttl: 10, // seconds
      max: 100, // maximum number of items in cache
    };
  }
}
