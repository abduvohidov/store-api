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
		price: {
			type: String,
			required: true,
		},
		img: {
			type: String,
		},
	},
	{
		collection: 'products',
	},
);

export const productModel = model<IProductModel>('Product', productSchema);
