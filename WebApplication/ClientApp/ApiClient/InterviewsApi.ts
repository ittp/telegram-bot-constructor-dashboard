import { ApiClient } from "./ApiClient";

export default class InterviewsApi {
	static async addInterview(botId: string, question: string, name: string, answers: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.postAsync('/api/interviews/add', {
				botId,
				question,
				name,
				answers
			}).then(() => {
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async removeInterview(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.postAsync('/api/interviews/remove', {id}).then(() => {
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async getInterviews(botId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/api/interviews', {botId}).then((interviews) => {
				resolve(interviews);
			}).catch(error => {
				reject(error);
			});
		});
	}
}