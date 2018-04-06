export class ApiClient {
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
			});
		});
	}

	static urlParams(data: FormData) {
		return [ ...data.entries() ]
			.map(e => encodeURIComponent(e[ 0 ]) + "=" + encodeURIComponent(e[ 1 ].toString())).join('&');
	}

	static mapToFormData(data: any): FormData {
		if (!data) {
			return new FormData();
		}

		let formData = new FormData();

		Object.keys(data).forEach(key => {
			formData.append(key, data[ key ]);
		});

		return formData;
	}
}