

export let Memberships = {
	post_memberships: async function (data, options) {

		let api = new ApiClass();
		await api.post('memberships', data);

		if (!api.response) return response['internalError'] = 'No response from api for memberships.memberships';

		let response = [];

		response = api.response;

		// if (api.response.status === 1) {
		// 	response['keyName'] = 'order';
		// 	response['url'] = '/bg/ordersummary';
		// }


		return response;


	},
	get_memberships: async function (data, options) {
		let response = [];

		let endpoint = Helpers.combineRequest('memberships', data);

		let api = new ApiClass();
		await api.get(endpoint, true);

		if (!api.response) return response['internalError'] = 'No response from api for Memberships.get_memberships';

		response['obj'] = api.response;
		response['keyName'] = 'memberships';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);

		return response;
	},
	get_my_memberships: async function (data, options) {
		let response = [];

		let endpoint = Helpers.combineRequest('my_memberships', data);

		let api = new ApiClass();
		await api.get(endpoint, true);

		if (!api.response) return response['internalError'] = 'No response from api for Memberships.get_memberships';

		response['obj'] = api.response;
		response['keyName'] = 'my_memberships';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);

		return response;
	},




}

window.Memberships = Memberships;
