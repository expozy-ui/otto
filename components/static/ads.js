export let Ads = {


	get_ads: async function (data, options) {
		let response = [];

		response['keyName'] = 'ads';
		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		let endpoint = Helpers.combineRequest('advertisements', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Ads.get_advertisements';


		response['obj'] = api.response;
		debugger;
		if (!data['type_id'] && !data['id']) {
			response['obj']['result'] = response['obj']['result'].filter(item => item.type_id !== 3);
		}

		if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);

		return response;
	},
	get_ads_plans: async function (data, options) {
		let response = [];

		response['keyName'] = 'ads_plans';
		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		let endpoint = Helpers.combineRequest('ads_plans', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Ads.get_ads_plans';

		response['obj'] = api.response;

		if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);

		return response;
	},
	get_ads_types: async function (data, options) {
		let response = [];

		response['keyName'] = 'ads_types';
		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		let endpoint = Helpers.combineRequest('ads_types', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Ads.get_ads_types';

		response['obj'] = api.response;

		if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);

		return response;
	},
	get_ads_fields: async function (data, options) {
		let response = [];

		response['keyName'] = 'ads_fields';
		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		let endpoint = Helpers.combineRequest('ads_fields', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Ads.get_ads_fields';

		response['obj'] = api.response;

		if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);

		return response;
	},
	get_ads_categories: async function (data, options) {
		let response = [];

		response['keyName'] = 'ads_categories';
		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		let endpoint = Helpers.combineRequest('ads_categories', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Ads.get_ads_categories';

		response['obj'] = api.response;

		if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);

		return response;
	},
	get_ads_wishlist: async function (data, options) {
		let response = [];

		response['keyName'] = 'ads_wishlist';
		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		let endpoint = Helpers.combineRequest('ads_wishlist', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Ads.get_ads_wishlist';

		response['obj'] = api.response;

		if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);

		return response;
	},
	post_ads: async function (data, options) {
		let response = [];

		let api = new ApiClass();
		// let endpoint = Helpers.combineRequest('advertisements', data);
		if (data.id) {
			await api.post('advertisements/' + data.id, data);
		} else {
			await api.post('advertisements', data);

		}

		if (!api.response) return response['internalError'] = 'No response from api for Ads.post_advertisements';
		response = api.response;


		if (api.response.status == 1) {
			let data = {
				user: api.response.obj.user_id
			}
			response = await Ads.get_ads(data, []);

			response['keyName'] = 'myAds';
			response['status'] = 1;
		}


		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		return response;
	},


	put_ads: async function (data, options) {
		let response = [];

		let api = new ApiClass();

		await api.put('advertisements/' + data.id, data);

		if (!api.response) return response['internalError'] = 'No response from api for Ads.put_advertisements';
		response = api.response;

		response['keyName'] = 'ads';
		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		return response;
	},

	delete_ads: async function (data, options) {
		let response = [];
		// CHECK DO WE HAVE data.id ELSE RETURN ERROR
		if (!("id" in data) && typeof (data.id) === "undefined") return { internalError: 0, msg: `No id is set for Ads.delete_ads` };

		let api = new ApiClass();
		await api.delete('advertisements/' + data.id, data);

		if (!api.response) return response['internalError'] = 'No response from api for Ads.delete_advertisements';
		response = api.response;
		response['keyName'] = 'ads';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		if (api.response.status == 1) {
			let data = {
				user: dataProxy.user.id
			}
			response = await Ads.get_ads(data, []);
			response['keyName'] = 'myAds';
			response['status'] = 1;
		}

		return response;
	},

	delete_ads_images: async function (data, options) {
		let response = [];
		// CHECK DO WE HAVE data.id ELSE RETURN ERROR
		if (!("id" in data) && typeof (data.id) === "undefined") return { internalError: 0, msg: `No id is set for Ads.delete_ads_images` };

		let api = new ApiClass();
		await api.delete('ads_images/' + data.id, data);

		if (!api.response) return response['internalError'] = 'No response from api for Ads.ads_images';

		response = api.response;

		if (api.response.status == 1) {
			let sendData = {
				id: data.ad_id
			}
			response = await Ads.get_ads(sendData, []);
			debugger;

		}

		response['keyName'] = 'ads';
		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];


		return response;
	},

	get_ads_requests: async function (data, options) {
		let response = [];

		response['keyName'] = 'ads_requests';
		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		let endpoint = Helpers.combineRequest('ads_requests', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Ads.ads_requests';

		response['obj'] = api.response;

		if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);

		return response;
	},

	post_ads_requests: async function (data, options) {
		let response = [];

		let api = new ApiClass();

		await api.post('ads_requests', data);

		if (!api.response) return response['internalError'] = 'No response from api for Ads.post_ads_requests';
		response = api.response;

		if (api.response.status == 1) {
			let ads_requestsRsp = await Ads.get_ads_requests(data, []);
			response['obj'] = ads_requestsRsp['obj'];

			if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];
		} else {
			response.keyName = 'empty';
		}




		return response;
	},






};
window.Ads = Ads;
