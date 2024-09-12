import { model, Schema, Types } from 'mongoose';
import { IUserModel } from './user.model.interface';

const userSchema = new Schema<IUserModel>(
	{
		id: {
			type: Types.ObjectId,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		collection: 'users',
	},
);

export const userModel = model<IUserModel>('User', userSchema);
