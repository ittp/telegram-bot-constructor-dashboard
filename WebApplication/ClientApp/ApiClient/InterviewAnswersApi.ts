import { ApiClient } from "./ApiClient";

export default class InterviewAnswersApi {
	static async getInterviewAnswers(botId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/api/interview-answers', {botId}).then((interviewAnswers) => {
				resolve(interviewAnswers);
			}).catch(error => {
				reject(error);
			});
		});
	}
}