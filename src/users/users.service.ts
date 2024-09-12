import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';
import { IUserRepository } from './users.repository.interface';
import { IUserModel } from './user.model.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUserRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<IUserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.findByEmail(email);
		if (existedUser) {
			return null;
		}
		return await this.usersRepository.create(newUser);
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
