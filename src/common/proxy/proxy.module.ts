import { Module } from '@nestjs/common';
import { ClientProxyNotJira } from './client-proxy';

@Module({
  providers: [ClientProxyNotJira],
  exports: [ClientProxyNotJira],
})
export class ProxyModule {}
