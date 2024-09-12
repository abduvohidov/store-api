import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';
import { IUserModel } from '../models/user.model.interface';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<IUserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
	getUsers: () => Promise<IUserModel[]>;
}
