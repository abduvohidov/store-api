import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';
import { IConfigService } from '../../../config/config.service.interface';
import { IProductService } from './product.service.interface';
import { IProductRepository } from '../repositories/product.repositories.interface';
import { ProductCreateDto } from '../dto/product-create.dto';
import { IProductModel } from '../models/product.model.interface';
import { Product } from '../models/product.entity';
import { ProductUpdateDto } from '../dto/product-update.dto';

@injectable()
export class ProductService implements IProductService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.ProductRepository) private productRepository: IProductRepository,
	) {}

	async createProduct({ name }: ProductCreateDto): Promise<IProductModel | null> {
		const newProduct = new Product(name);
		const existedProduct = await this.productRepository.findByName(name);
		if (existedProduct) {
			return null;
		}
		return await this.productRepository.create(newProduct);
	}

	async getProducts(): Promise<IProductModel[]> {
		return await this.productRepository.find();
	}

	async getProductByName(name: string): Promise<IProductModel | null> {
		return await this.productRepository.findByName(name);
	}

	async getProductById(id: string): Promise<IProductModel | null> {
		return await this.productRepository.findById(id);
	}

	async updateProduct(id: string, dto: ProductUpdateDto): Promise<IProductModel | null> {
		const existedProduct = await this.productRepository.findById(id);
		if (!existedProduct) {
			return null;
		}

		return await this.productRepository.updateById(id, dto);
	}
	async removeProduct(id: string): Promise<string | null> {
		return await this.productRepository.removeById(id);
	}
}
