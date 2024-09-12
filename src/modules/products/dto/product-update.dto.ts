import { IsString } from 'class-validator';

export class ProductUpdateDto {
	@IsString()
	_id: string;

	@IsString()
	name: string;
}
