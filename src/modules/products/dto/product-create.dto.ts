import { IsString } from 'class-validator';

export class ProductCreateDto {
	@IsString()
	name: string;
	price: string;
	img: string;
}
