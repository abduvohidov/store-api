import { inject, injectable } from 'inversify';
import { IUserRepository } from './users.repository.interface';
import { TYPES } from '../types';
import { MongoService } from '../database';
import { User } from './user.entity';
import { IUserModel } from './user.model.interface';
import { userModel } from './user.model';

@injectable()
export class UsersRepository implements IUserRepository {
	constructor(@inject(TYPES.MongoService) private mongoService: MongoService) {}

	async create({ email, name, password }: User): Promise<IUserModel> {
		const newUser = await userModel.create({
			name,
			email,
			password,
		});
		return newUser;
	}

	async findByEmail(email: string): Promise<IUserModel | null> {
		return userModel.findOne({ email }).exec();
	}
}
