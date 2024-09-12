import { CategoryUpdateDto } from '../dto/category-update.dto';
import { Category } from '../models/category.entity';
import { ICategoryModel } from '../models/category.model.interface';

export interface ICategoryRepository {
	create: (name: Category) => Promise<ICategoryModel>;
	find: () => Promise<ICategoryModel[]>;
	findByName: (name: string) => Promise<ICategoryModel | null>;
	findById: (id: string) => Promise<ICategoryModel | null>;
	updateById: (
		id: string,
		{ name, productsId }: CategoryUpdateDto,
	) => Promise<ICategoryModel | null>;
	removeById: (id: string) => Promise<string | null>;
}
