import { IBot } from "../Models/IBot";
import { ApiClient } from "./ApiClient";

export default class BotsApi {
	static async startBot(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/runner-api/start', {id}).then((response) => {
				resolve(response);
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async stopBot(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/runner-api/stop', {id}).then((response) => {
				resolve(response);
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async checkBot(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/runner-api/check', {id}).then((response) => {
				resolve(response.status);
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async getActiveBots(bots: IBot[]): Promise<any> {
		return new Promise((resolve, reject) => {
			const activeBots = [] as IBot[];
			Promise.all(bots.map((bot) => {
				return new Promise((end) => {
					this.checkBot(bot.id).then((works) => {
						if (works) {
							activeBots.push(bot);
							end();
						}
						end();
					})
				});
			})).then(() => {
				resolve(activeBots);
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async getBotByToken(token: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/api/bots/bot/by-token', {token}).then((bot) => {
				resolve(bot);
			}).catch(error => {
				reject(error);
			});
		})
	}

	static async addBot(name: string, token: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.postAsync('/api/bots/add', {name, token}).then(() => {
				this.getBotByToken(token).then((bot) => {
					this.startBot(bot.id).then(() => {
						resolve();
					}).catch(error => {
						reject(error);
					});
				}).catch(error => {
					reject(error);
				});
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async getBots(): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/api/bots').then((bots: IBot[]) => {
				resolve(bots);
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async removeBot(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.postAsync('/api/bots/remove', {id: id}).then(() => {
				this.stopBot(id).then(() => {
					resolve();
				}).catch(error => {
					reject(error);
				});
			}).catch(error => {
				reject(error);
			});
		});
	}
}