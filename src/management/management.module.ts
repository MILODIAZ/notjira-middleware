import { Module } from '@nestjs/common';
import { TeamController } from './team/controller/team.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { ClientProxyNotJira } from 'src/common/proxy/client-proxy';

@Module({
  imports: [ProxyModule],
  providers: [ClientProxyNotJira],
  controllers: [TeamController],
})
export class ManagementModule {}
