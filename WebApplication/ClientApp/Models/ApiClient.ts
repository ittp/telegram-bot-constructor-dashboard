export class ApiClient {
	static urlParams(data: FormData) {
		return [ ...data.entries() ]
			.map(e => encodeURIComponent(e[ 0 ]) + "=" + encodeURIComponent(e[ 1 ].toString())).join('&');
	}

	static mapToFormData(data: any): FormData{
		if (!data){
			return new FormData();
		}

		let formData = new FormData();

		Object.keys(data).forEach(key => {
			formData.append(key, data[key]);
		});

		return formData;
	}

	static async getAsync(url: string, data?: any) {
		let parameters = data ? ApiClient.urlParams(ApiClient.mapToFormData(data)): '';

		let response = await fetch(url + '?' + parameters, {
			mode: "no-cors", headers: {
				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
			}
		});

		return await response.json();
	}

	static async postAsync(url: string, data?: any) {
		let body = data ? ApiClient.urlParams(ApiClient.mapToFormData(data)): null;

		let response = await fetch(url, {
			mode: "no-cors", method: 'post', headers: {
				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			body: body
		});

		return await response.json();
	}
}