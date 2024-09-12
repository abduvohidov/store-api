import { ProductCreateDto } from '../dto/product-create.dto';
import { ProductUpdateDto } from '../dto/product-update.dto';
import { IProductModel } from '../models/product.model.interface';

export interface IProductService {
	createProduct: (dto: ProductCreateDto) => Promise<IProductModel | null>;
	getProducts: () => Promise<IProductModel[]>;
	getProductByName: (name: string) => Promise<IProductModel | null>;
	getProductById: (id: string) => Promise<IProductModel | null>;
	updateProduct: (id: string, dto: ProductUpdateDto) => Promise<IProductModel | null>;
	removeProduct: (id: string) => Promise<string | null>;
}
