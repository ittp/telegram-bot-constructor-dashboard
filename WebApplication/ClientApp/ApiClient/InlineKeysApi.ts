import { ApiClient } from "./ApiClient";

export default class InlineKeysApi {
	static async getInlineKeys(botId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/api/inline-keys', { botId }).then((inlineKeys) => {
				resolve(inlineKeys);
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async addInlineKey(botId: string, caption: string, answer: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.postAsync('/api/inline-keys/add', { botId, caption, answer, }).then(() => {
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async removeInlineKey(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.postAsync('/api/inline-keys/remove', { id: id }).then(() => {
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}
}