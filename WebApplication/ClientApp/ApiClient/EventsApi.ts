import { IEvent } from "../Models/IEvent";
import { ApiClient } from "./ApiClient";

export default class EventsApi {
	static async getEvents(botId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.getAsync('/api/events', {botId}).then((events: IEvent[]) => {
				resolve(events);
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async addEvent(botId: string, text: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.postAsync('/api/events/add', {botId, text}).then(() => {
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}

	static async removeEvent(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			ApiClient.postAsync('/api/events/remove', {id: id}).then(() => {
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}
}