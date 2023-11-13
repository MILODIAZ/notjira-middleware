import { Module } from '@nestjs/common';
import { TeamController } from './team/controller/team.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { ClientProxyNotJira } from 'src/common/proxy/client-proxy';
import { ProjectController } from './project/controller/project/project.controller';

@Module({
  imports: [ProxyModule],
  providers: [ClientProxyNotJira],
  controllers: [TeamController, ProjectController],
})
export class ManagementModule {}
