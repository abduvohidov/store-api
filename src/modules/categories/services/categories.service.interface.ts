import { CategoryCreateDto } from '../dto/category-create.dto';
import { CategoryUpdateDto } from '../dto/category-update.dto';
import { ICategoryModel } from '../models/category.model.interface';

export interface ICategoryService {
	createCategory: (dto: CategoryCreateDto) => Promise<ICategoryModel | null>;
	getCategories: () => Promise<ICategoryModel[]>;
	getCategoryByName: (name: string) => Promise<ICategoryModel | null>;
	getCategoryById: (id: string) => Promise<ICategoryModel | null>;
	updateCategory: (id: string, dto: CategoryUpdateDto) => Promise<ICategoryModel | null>;
	removeCategory: (id: string) => Promise<string | null>;
}
