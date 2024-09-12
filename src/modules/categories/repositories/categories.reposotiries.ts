import { inject, injectable } from 'inversify';
import { ICategoryRepository } from './categories.reposotiries.interface';
import { TYPES } from '../../../types';
import { MongoService } from '../../../database';
import { Category } from '../models/category.entity';
import { ICategoryModel } from '../models/category.model.interface';
import { categoryModel } from '../models/category.model';
import { CategoryUpdateDto } from '../dto/category-update.dto';

@injectable()
export class CategoryRepository implements ICategoryRepository {
	constructor(@inject(TYPES.MongoService) private mongoService: MongoService) {}

	async create({ name, productsId }: Category): Promise<ICategoryModel> {
		const newCategory = await categoryModel.create({
			name,
			productsId,
		});
		return newCategory;
	}

	async find(): Promise<ICategoryModel[]> {
		return await categoryModel.find();
	}

	async findByName(name: string): Promise<ICategoryModel | null> {
		return await categoryModel.findOne({ name });
	}

	async findById(id: string): Promise<ICategoryModel | null> {
		return await categoryModel.findById({ _id: id });
	}

	async updateById(
		_id: string,
		{ name, productsId }: CategoryUpdateDto,
	): Promise<ICategoryModel | null> {
		if (!_id) {
			throw new Error('ID категории не указан');
		}

		return await categoryModel.findByIdAndUpdate(_id, { name, productsId }, { new: true });
	}
	async removeById(id: string): Promise<string | null> {
		return await categoryModel.findByIdAndDelete(id);
	}
}
