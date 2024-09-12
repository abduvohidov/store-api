import { id, inject, injectable } from 'inversify';
import { IConfigService } from '../../../config/config.service.interface';
import { TYPES } from '../../../types';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';
import { User } from '../models/user.entity';
import { IUserService } from './users.service.interface';
import { IUserRepository } from '../repositories/users.repository.interface';
import { IUserModel } from '../models/user.model.interface';

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

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.findByEmail(email);
		if (!existedUser) {
			return false;
		}
		const newUser = await new User(existedUser.email, existedUser.name, existedUser.password);
		return newUser.comparePassword(password);
	}

	async getUsers(): Promise<IUserModel[]> {
		return await this.usersRepository.find();
	}
}
