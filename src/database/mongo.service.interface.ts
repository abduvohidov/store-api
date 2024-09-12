export interface IMongoService {
	connect(): Promise<void>;
}
