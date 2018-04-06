import { ApiClient } from "./ApiClient";
import UsersService from "../Services/UsersService";

export default class UsersApi {
	static async getUsers(botId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/api/users', {botId}).then((users) => {
				resolve(users.map(UsersService.mapUser));
			}).catch(error => {
				reject(error)
			});
		});
	}
}