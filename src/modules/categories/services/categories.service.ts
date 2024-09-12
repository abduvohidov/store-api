import { inject, injectable } from 'inversify';
import { ICategoryService } from './categories.service.interface';
import { TYPES } from '../../../types';
import { IConfigService } from '../../../config/config.service.interface';
import { CategoryCreateDto } from '../dto/category-create.dto';
import { ICategoryModel } from '../models/category.model.interface';
import { Category } from '../models/category.entity';
import { ICategoryRepository } from '../repositories/categories.reposotiries.interface';
import { CategoryUpdateDto } from '../dto/category-update.dto';

@injectable()
export class CategoryService implements ICategoryService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.CategoriesRepository) private categoriesRepository: ICategoryRepository,
	) {}

	async createCategory({ name, productsId }: CategoryCreateDto): Promise<ICategoryModel | null> {
		const newCategory = new Category(name, productsId);
		const existedCategory = await this.categoriesRepository.findByName(name);
		if (existedCategory) {
			return null;
		}
		return await this.categoriesRepository.create(newCategory);
	}

	async getCategories(): Promise<ICategoryModel[]> {
		return await this.categoriesRepository.find();
	}

	async getCategoryByName(name: string): Promise<ICategoryModel | null> {
		return await this.categoriesRepository.findByName(name);
	}

	async getCategoryById(id: string): Promise<ICategoryModel | null> {
		return await this.categoriesRepository.findById(id);
	}

	async updateCategory(id: string, dto: CategoryUpdateDto): Promise<ICategoryModel | null> {
		const existedCategory = await this.categoriesRepository.findById(id);
		if (!existedCategory) {
			return null;
		}

		return await this.categoriesRepository.updateById(id, dto);
	}
	async removeCategory(id: string): Promise<string | null> {
		return await this.categoriesRepository.removeById(id);
	}
}
