import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';
import { MongoService } from '../../../database';
import { IProductRepository } from './product.repositories.interface';
import { IProductModel } from '../models/product.model.interface';
import { Product } from '../models/product.entity';
import { productModel } from '../models/product.model';
import { ProductUpdateDto } from '../dto/product-update.dto';

@injectable()
export class ProductRepository implements IProductRepository {
	constructor(@inject(TYPES.MongoService) private mongoService: MongoService) {}

	async create({ name }: Product): Promise<IProductModel> {
		const newProduct = await productModel.create({
			name,
		});
		return newProduct;
	}

	async find(): Promise<IProductModel[]> {
		return await productModel.find();
	}

	async findByName(name: string): Promise<IProductModel | null> {
		return await productModel.findOne({ name });
	}

	async findById(id: string): Promise<IProductModel | null> {
		return await productModel.findById({ _id: id });
	}

	async updateById(_id: string, { name }: ProductUpdateDto): Promise<IProductModel | null> {
		if (!_id) {
			throw new Error('ID продукта не указан');
		}

		return await productModel.findByIdAndUpdate(_id, { name }, { new: true });
	}
	async removeById(id: string): Promise<string | null> {
		return await productModel.findByIdAndDelete(id);
	}
}
