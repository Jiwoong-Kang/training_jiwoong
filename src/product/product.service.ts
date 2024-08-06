import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts() {
    const products = await this.productRepository.find();
    return { count: products.length, data: products };
  }

  async postProduct(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepository.create(createProductDto);
    await this.productRepository.save(createProductDto);
    return newProduct;
  }

  async getProduct(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async deleteProductById(id: string) {
    const deletedResponse = await this.productRepository.delete({ id });
    if (!deletedResponse.affected) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return 'Product deleted successfully';
  }

  async deleteProducts() {
    const deletedResponse = await this.productRepository.delete({});
    if (!deletedResponse.affected) {
      throw new HttpException('Something new Error', HttpStatus.BAD_REQUEST);
    }
    return 'Deleted all Products';
  }

  async updateProductById(id: string, updatedProductDto: CreateProductDto) {
    const updatedProduct = await this.productRepository.findOneBy({ id });
    if (updatedProductDto) {
      return updatedProduct;
    }
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }
}
