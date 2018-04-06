import { ApiClient } from "./ApiClient";

export default class TextMessageAnswersApi {
	static async getTextMessageAnswers(botId: string): Promise<any> {
		return new Promise((resolve) => {
			ApiClient.getAsync('/api/text-message-answers', {botId}).then((textMessageAnswers) => {
				resolve(textMessageAnswers);
			}).catch(error => {
				resolve(error);
			});
		});
	}

	static async removeTextMessageAnswer(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.postAsync('/api/text-message-answers/remove', {id}).then(() => {
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async addTextMessageAnswer(botId: string, message: string, answer: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.postAsync('/api/text-message-answers/add', {
				botId,
				message,
				answer
			}).then(() => {
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}
}