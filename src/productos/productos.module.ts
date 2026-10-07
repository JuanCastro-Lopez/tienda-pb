import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './entities/producto.entity';
import { CategoriasModule } from '../categorias/categorias.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto]),
    CategoriasModule, // Importamos CategoriasModule para poder inyectar CategoriasService
    AuthModule,
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
