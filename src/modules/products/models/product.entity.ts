export class Product {
	constructor(
		private readonly _name: string,
		private readonly _price: string,
		private readonly _img: string,
	) {}

	get name(): string {
		return this._name;
	}

	get price(): string {
		return this._price;
	}

	get img(): string {
		return this._img;
	}
}
