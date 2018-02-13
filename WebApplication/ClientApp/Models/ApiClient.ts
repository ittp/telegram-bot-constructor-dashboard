export class ApiClient {
	static urlParams(data: FormData) {
		return [ ...data.entries() ]
			.map(e => encodeURIComponent(e[ 0 ]) + "=" + encodeURIComponent(e[ 1 ].toString())).join('&');
	}

	static async get(url: any): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			try {
				fetch(url, {mode: "no-cors"}).then(response => {
					response.json().then(data => {
						reject('Cant get data');
						//resolve(data);
					});
				});
			} catch (e) {
				reject('Cant get data');
			}
		});
	}

	static async post(url: string, data: FormData): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			try {
				fetch(url, {
						mode: "no-cors",
						method: 'post',
						headers: {
							"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
						},
						body: ApiClient.urlParams(data)
					}
				).then((response) => {
					response.json().then(data => {
						resolve(data);
					});
				});
			} catch (e) {
				reject('Cant post data');
			}
		});
	}
}