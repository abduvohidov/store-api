import { Document, Types } from 'mongoose';

export interface IUserModel extends Document {
	id?: Types.ObjectId;
	name: string;
	email: string;
	password: string;
}
