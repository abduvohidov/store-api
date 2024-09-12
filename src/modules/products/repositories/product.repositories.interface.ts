import { ProductUpdateDto } from '../dto/product-update.dto';
import { Product } from '../models/product.entity';
import { IProductModel } from '../models/product.model.interface';

export interface IProductRepository {
	create: (name: Product) => Promise<IProductModel>;
	find: () => Promise<IProductModel[]>;
	findByName: (name: string) => Promise<IProductModel | null>;
	findById: (id: string) => Promise<IProductModel | null>;
	updateById: (id: string, { name }: ProductUpdateDto) => Promise<IProductModel | null>;
	removeById: (id: string) => Promise<string | null>;
}
