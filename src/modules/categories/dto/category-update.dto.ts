import { IsString } from 'class-validator';

export class CategoryUpdateDto {
	@IsString()
	_id: string;

	@IsString()
	name: string;

	@IsString()
	productsId: string;
}
