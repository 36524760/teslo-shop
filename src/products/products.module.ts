import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

// import { Product, ProductImage } from './entities';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage]),
    AuthModule
  ],
  exports: [
    ProductsService,
    TypeOrmModule
  ]
})
export class ProductsModule { }
