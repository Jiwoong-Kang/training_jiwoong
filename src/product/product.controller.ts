import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all')
  async getAllProducts() {
    return await this.productService.getProducts();
  }

  @Post('/create')
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.postProduct(createProductDto);
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProduct(id);
  }
}
