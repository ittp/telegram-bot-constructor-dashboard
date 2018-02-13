export class ApiClient {
	static urlParams(data: FormData) {
		return [ ...data.entries() ]
			.map(e => encodeURIComponent(e[ 0 ]) + "=" + encodeURIComponent(e[ 1 ].toString())).join('&');
	}

	static async getAsync(url: string, data?: FormData) {
		let response = await fetch(url, {
			mode: "no-cors", headers: {
				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			body: data ? ApiClient.urlParams(data) : null
		});
		return await response.json();
	}

	static async postAsync(url: string, data: FormData) {
		let response = await fetch(url, {
			mode: "no-cors", method: 'post', headers: {
				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			body: ApiClient.urlParams(data)
		});
		return await response.json();
	}
}