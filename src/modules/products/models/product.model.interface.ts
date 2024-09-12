import { Document, Types } from 'mongoose';

export interface IProductModel extends Document {
	id?: Types.ObjectId;
	name: string;
}
