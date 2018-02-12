import { IBot } from "./IBot";

export class ApiClient {
	static async getBots(): Promise<any> {
		return new Promise((resolve, reject) => {
			fetch('/api/bots', {mode: "no-cors"}).then(response => {
				if (response.status != 200) {
					reject('Cant get data. Response status: ' + response.status);
				}
				response.json().then(data => {
					resolve(data as IBot[]);
				});
			});
		});
	}
}