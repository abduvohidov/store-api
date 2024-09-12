import { User } from './user.entity';
import { IUserModel } from './user.model.interface';

export interface IUserRepository {
	create: (name: User) => Promise<IUserModel>;
	findByEmail: (email: string) => Promise<IUserModel | null>;
}
