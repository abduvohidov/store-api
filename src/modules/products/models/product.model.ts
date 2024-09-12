import { model, Schema, Types } from 'mongoose';
import { IProductModel } from './product.model.interface';

const productSchema = new Schema<IProductModel>(
	{
		id: {
			type: Types.ObjectId,
		},
		name: {
			type: String,
			required: true,
		},
	},
	{
		collection: 'products',
	},
);

export const productModel = model<IProductModel>('Product', productSchema);
