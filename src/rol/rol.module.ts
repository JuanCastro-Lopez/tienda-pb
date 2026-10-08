import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { RolEntity } from './entities/rol.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([RolEntity])],
  providers: [RolService, JwtAuthGuard, RoleGuard],
  controllers: [RolController],
  exports: [RolService],
})
export class RolModule {}
