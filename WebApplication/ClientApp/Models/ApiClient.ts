import { IBot } from "./IBot";
import { IInlineKey } from "./IInlineKey";
import { IInterview } from "./IInterview";

export class ApiClient {
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
			ApiClient.postAsync('/api/remove-bot', { id: id }).then(() => {
				ApiClient.stopBot(id).then(() => {
					resolve();
				}).catch(error => {
					reject(error);
				});;
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async stopBot(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/runner-api/stop', { id }).then((response) => {
				resolve(response);
			}).catch(error => {
				reject(error);
			});;
		});
	}

	static async startBot(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/runner-api/start', { id }).then((response) => {
				resolve(response);
			}).catch(error => {
				reject(error);
			});;
		});
	}

	static async checkBot(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/runner-api/check', { id }).then((response) => {
				resolve(response.status);
			}).catch(error => {
				reject(error);
			});;
		});
	}

	static async getActiveBots(bots: IBot[]): Promise<any> {
		return new Promise((resolve, reject) => {
			const activeBots = [] as IBot[];
			Promise.all(bots.map((bot) => {
				return new Promise((end) => {
					ApiClient.checkBot(bot.id).then((works) => {
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
			ApiClient.getAsync('/api/bot-by-token', { token }).then((bot) => {
				resolve(bot);
			}).catch(error => {
				reject(error);
			});
		})
	}

	static async addBot(name: string, token: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.postAsync('/api/add-bot', { name, token }).then(() => {
				ApiClient.getBotByToken(token).then((bot) => {
					ApiClient.startBot(bot.id).then(() => {
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

	static async getInlineKeys(botId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/api/inline-keys', { botId }).then((inlineKeys) => {
				reject(inlineKeys);
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async addInlineKey(botId: string, caption: string, answer: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.postAsync('/api/add-inline-key', { botId, caption, answer, }).then(() => {
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async removeInlineKey(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.postAsync('/api/remove-inline-key', { id: id }).then(() => {
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async addInterview(botId: string, question: string, name: string, answers: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.postAsync('/api/add-interview', {
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
			ApiClient.postAsync('/api/remove-interview', { id }).then(() => {
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async getInterviews(botId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/api/interviews', { botId }).then((interviews) => {
				resolve(interviews);
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async getInterviewAnswers(botId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/api/interview-answers', { botId }).then((interviewAnswers) => {
				resolve(interviewAnswers);
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async getUsers(botId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/api/users', { botId }).then((users) => {
				resolve(users);
			}).catch(error => {
				reject(error)
			});
		});
	}

	static async getTextMessageAnswers(botId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/api/text-message-answers', { botId }).then((textMessageAnswers) => {
				resolve(textMessageAnswers);
			}).catch(error => {
				resolve(error);
			});
		});
	}

	static async removeTextMessageAnswer(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.postAsync('/api/remove-text-message-answer', { id }).then(() => {
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async addTextMessageAnswer(botId: string, message: string, answer: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.postAsync('/api/add-text-message-answer', {
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

	static async getAsync(url: string, data?: any): Promise<any> {
		return new Promise((resolve, reject) => {
			let parameters = data ? ApiClient.urlParams(ApiClient.mapToFormData(data)) : '';
			fetch(url + '?' + parameters, {
				mode: "no-cors", headers: {
					"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			}).then(response => {
				response.json().then(result => {
					resolve(result);
				}).catch(error => {
					reject(error);
				});
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async postAsync(url: string, data?: any): Promise<any> {
		let body = data ? ApiClient.urlParams(ApiClient.mapToFormData(data)) : null;

		return new Promise((resolve, reject) => {
			fetch(url, {
				mode: "no-cors", method: 'post', headers: {
					"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				body: body
			}).then(response => {
				response.json().then(result => {
					resolve(result);
				}).catch(error => {
					reject(error);
				});
			}).catch(error => {
				reject(error);
			});;
		});
	}

	static urlParams(data: FormData) {
		return [...data.entries()]
			.map(e => encodeURIComponent(e[0]) + "=" + encodeURIComponent(e[1].toString())).join('&');
	}

	static mapToFormData(data: any): FormData {
		if (!data) {
			return new FormData();
		}

		let formData = new FormData();

		Object.keys(data).forEach(key => {
			formData.append(key, data[key]);
		});

		return formData;
	}
}