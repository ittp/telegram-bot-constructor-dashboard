import { IUser } from "../Models/IUser";

export default class UsersService {
	public static mapUser(user: any): IUser {
		const networkingObj = JSON.parse(user.networking);

		let networking = [];

		for (const name in networkingObj) {
			networking.push(`${name}: ${networkingObj[ name ]}`);
		}

		return {
			botId: user.botId,
			firstName: user.firstName,
			lastName: user.lastName,
			id: user.id,
			telegramId: user.telegramId,
			userName: user.userName,
			networking: networking
		}
	}
}