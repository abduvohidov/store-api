import { Document, Types } from 'mongoose';

export interface ICategoryModel extends Document {
	id?: Types.ObjectId;
	name: string;
	productsId: string;
}
