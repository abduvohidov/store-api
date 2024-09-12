import { User } from '../models/user.entity';
import { IUserModel } from '../models/user.model.interface';

export interface IUserRepository {
	create: (name: User) => Promise<IUserModel>;
	find(): Promise<IUserModel[]>;
	findByEmail: (email: string) => Promise<IUserModel | null>;
}
