import { Module } from '@nestjs/common';
import { TeamController } from './team/controller/team.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { ClientProxyNotJira } from 'src/common/proxy/client-proxy';
import { ProjectController } from './project/controller/project.controller';
import { TaskController } from './task/controller/task.controller';
import { CommentController } from './comment/controller/comment.controller';

@Module({
  imports: [ProxyModule],
  providers: [ClientProxyNotJira],
  controllers: [TeamController, ProjectController, TaskController, CommentController],
})
export class ManagementModule {}
