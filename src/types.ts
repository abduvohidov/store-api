export const TYPES = {
	Application: Symbol.for('Application'),
	ILogger: Symbol.for('ILogger'),
	ExeptionFilter: Symbol.for('ExeptionFilter'),
	ConfigService: Symbol.for('ConfigService'),
	MongoService: Symbol.for('MongoService'),

	UserController: Symbol.for('UserController'),
	UserService: Symbol.for('UserService'),
	UserModel: Symbol.for('UserModel'),
	UsersRepository: Symbol.for('UsersRepository'),

	CategoryController: Symbol.for('CategoryController'),
	CategoryService: Symbol.for('CategoryService'),
	CategoryModel: Symbol.for('CategoryModel'),
	CategoriesRepository: Symbol.for('CategoriesRepository'),

	ProductController: Symbol.for('ProductController'),
	ProductService: Symbol.for('ProductService'),
	ProductModel: Symbol.for('ProductModel'),
	ProductRepository: Symbol.for('ProductRepository'),
};
