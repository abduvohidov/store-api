import { model, Schema, Types } from 'mongoose';
import { ICategoryModel } from './category.model.interface';

const categorySchema = new Schema<ICategoryModel>(
	{
		id: {
			type: Types.ObjectId,
		},
		name: {
			type: String,
			required: true,
		},
		productsId: {
			type: String,
			required: true,
		},
	},
	{
		collection: 'categories',
	},
);

export const categoryModel = model<ICategoryModel>('Category', categorySchema);
