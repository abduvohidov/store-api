export class Category {
	constructor(private readonly _name: string, private readonly _productsId: string) {}

	get name(): string {
		return this._name;
	}

	get productsId(): string {
		return this._productsId;
	}
}
