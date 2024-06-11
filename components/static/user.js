

export let User = {

	login: async function (data, options) {

		let response = [];
		let api = new ApiClass();
		await api.post('login', data);


		if (api.response.status === 1) {

			api.response.user['logged_in'] = true;
			response['keyName'] = 'user';

			response['obj'] = api.response.user
			response['url'] = `/${LANG}/userpage`;
			dataProxy['openLogin'] = false;
			localStorage.setItem('token', api.response.token);


			fetch('/pages/editorLogin.php', {
				method: 'POST',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ login: 1, user: api.response.user, token: api.response.token })
			}).then(res => res.json()).then(function (response2) {

			});



			return response;
		} else {
			return api.response;
		}

	},

	post_users: async function (data, options) {
		let response = [];
		let api = new ApiClass();

		await api.post('users', data);

		if (!api.response) return response['internalError'] = 'No response from api for Users.post_users';

		response = api.response;


		if (api.response.status == 1) {

			dataProxy.openRegistration = false;

			let dataLogin = {
				email: data.email,
				password: data.password
			};

			let responseLogin = await User.login(dataLogin, []);
			response['keyName'] = 'user';
			response['obj'] = responseLogin['obj'];
			response['url'] = `/${LANG}/userpage`;

		}


		return response;

	},

	post_user_avatar: async function (data, options) {
		let response = [];
		let api = new ApiClass();

		await api.post('user_avatar', data);

		if (!api.response) return response['internalError'] = 'No response from api for Users.post_user_avatar';

		response = api.response;

		if (response.status == 1) {

			response = await User.get_accounts([], []);
			response['keyName'] = 'user';
		}


		return response;

	},
	post_user_images: async function (data, options) {
		let response = [];
		let api = new ApiClass();

		await api.post('user_images', data);

		if (!api.response) return response['internalError'] = 'No response from api for Users.post_user_images';

		response = api.response;
		response['keyName'] = 'my_portfolio';

		if (api.response.status == 1) {
			if (dataProxy.user.userlevel == 1) {
				response = await User.get_my_portfolio([], []);
			}
			if (dataProxy.user.userlevel == 2) {

				response = await User.get_my_bussiness_portfolio([], []);
			}

		}


		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];



		return response;

	},


	put_accounts: async function (data, options) {
		let response = [];
		let api = new ApiClass();

		await api.put('accounts', data);
		if (!api.response) return response['internalError'] = 'No response from api for User.put_accounts';
		response['keyName'] = 'user';
		response = api.response;
		return response;
	},


	post_user_address: async function (data, options) {

		let response = [];
		let api = new ApiClass();
		await api.post('user_address', data);

		if (!api.response) return response['internalError'] = 'No response from api for User.post_user_address';

		response = api.response;

		if (api.response.status == 1) {
			response = await User.get_accounts();
		}

		return response;
	},

	delete_user_address: async function (data, options) {
		let response = [];

		// CHECK DO WE HAVE data.id ELSE RETURN ERROR
		if (!("id" in data) && typeof (data.id) === "undefined") return { internalError: 0, msg: `No id is set for Users.delete_user_address` };

		let api = new ApiClass();
		await api.delete('user_address/' + data.id, data);

		if (!api.response) return response['internalError'] = 'No response from api for Users.delete_user_address';

		response = api.response;

		if (api.response.status == 1) {
			response = await User.get_accounts();
		}
		return response;
	},


	get_accounts: async function (data, options) {
		let response = [];


		let api = new ApiClass();

		await api.get('accounts', false);

		if (!api.response) return response['internalError'] = 'No response from api for Users.get_accounts';

		if ("id" in api.response && (api.response.id) !== 0) api.response['logged_in'] = true;


		response['obj'] = api.response;
		response.keyName = 'user';

		// if("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];
		if (options != undefined) {
			if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);
		}


		return response;
	},

	post_forgot_password: async function (data, options) {

		let response = [];
		let api = new ApiClass();
		await api.post('forgot_password', data);

		if (!api.response) return response['internalError'] = 'No response from api for User.post_forgot_password';

		response = api.response;

		return response;
	},

	get_portfolio_types: async function (data, options) {
		let response = [];

		let api = new ApiClass();
		await api.get('portfolio_types', false);

		if (!api.response) return response['internalError'] = 'No response from api for Users.get_portfolio_types';

		response['obj'] = api.response;
		response.keyName = 'portfolio_types';

		if (options != undefined) {
			if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);
		}


		return response;
	},
	get_portfolio_subtypes: async function (data, options) {
		let response = [];

		let api = new ApiClass();
		await api.get('portfolio_subtypes', false);

		if (!api.response) return response['internalError'] = 'No response from api for Users.get_portfolio_subtypes';

		response['obj'] = api.response;
		response.keyName = 'portfolio_subtypes';

		if (options != undefined) {
			if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);
		}


		return response;
	},



	get_portfolios: async function (data, options) {
		let response = [];
		let endpoint = Helpers.combineRequest('portfolios', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Users.get_portfolios';

		response['obj'] = api.response;
		response.keyName = 'portfolios';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		if (options != undefined) {
			if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);
		}


		return response;
	},

	get_my_portfolio: async function (data, options) {
		let response = [];
		let endpoint = Helpers.combineRequest('my_portfolio', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Users.get_my_portfolio';

		if (api.response.length > 0) {
			// response['obj']['frontP']
		}
		response['obj'] = api.response;
		// if (api.response.length > 0) {
		// 	response['obj'] = [];
		// 	response['obj']['front'] = api.response.find(obj => obj.type_id == 1);
		// 	response['obj']['back'] = api.response.find(obj => obj.type_id == 2);
		// 	response['obj']['all'] = api.response;
		// } else {
		// 	let properties = await User.get_portfolios_properties({ bycode: 1 }, []);
		// 	response['obj'] = [];
		// 	response['obj']['front'] = [];
		// 	response['obj']['back'] = [];
		// 	response['obj']['front']['properties'] = properties['obj'];
		// 	response['obj']['back']['properties'] = properties['obj'];

		// }

		response.keyName = 'my_portfolio';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		if (options != undefined) {
			if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);
		}


		return response;
	},
	get_portfolio_views: async function (data, options) {
		let response = [];
		let endpoint = Helpers.combineRequest('portfolio_views', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Users.get_portfolio_views';


		response['obj'] = api.response;


		response.keyName = 'portfolio_views';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		if (options != undefined) {
			if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);
		}


		return response;
	},

	get_portfolios_properties: async function (data, options) {
		let response = [];
		let endpoint = Helpers.combineRequest('portfolios_properties', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Users.get_portfolios_properties';

		response['obj'] = api.response;
		response.keyName = 'portfolios_properties';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		if (options != undefined) {
			if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);
		}


		return response;
	},

	get_portfolio_filters: async function (data, options) {
		let response = [];
		let endpoint = Helpers.combineRequest('portfolio_filters', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Users.get_portfolio_filters';

		response['obj'] = api.response;
		response.keyName = 'portfolio_filters';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		if (options != undefined) {
			if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);
		}


		return response;
	},



	post_portfolios: async function (data, options) {

		let response = [];
		let api = new ApiClass();

		await api.post('portfolios', data);

		if (!api.response) return response['internalError'] = 'No response from api for User.post_portfolios';

		response = api.response;

		// if (api.response.status == 1) {
		// 	response = await User.portfolios();
		// }

		return response;
	},

	post_user_files: async function (data, options) {
		let response = [];
		let api = new ApiClass();

		await api.post('user_files', data);

		if (!api.response) return response['internalError'] = 'No response from api for Users.post_user_files';

		response = api.response;

		response['keyName'] = 'my_portfolio';
		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];



		return response;

	},



	delete_portfolio_images: async function (data, options) {
		let response = [];

		// CHECK DO WE HAVE data.id ELSE RETURN ERROR
		if (!("id" in data) && typeof (data.id) === "undefined") return { internalError: 0, msg: `No id is set for Users.delete_portfolio_images` };

		let api = new ApiClass();
		await api.delete('portfolio_images/' + data.id, data);

		if (!api.response) return response['internalError'] = 'No response from api for Users.delete_portfolio_images';

		response = api.response;
		response['keyName'] = 'my_portfolio';

		if (api.response.status == 1) {
			if (dataProxy.user.userlevel == 1) {
				response = await User.get_my_portfolio([], []);
			}
			if (dataProxy.user.userlevel == 2) {

				response = await User.get_my_bussiness_portfolio([], []);
			}

		}

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];


		return response;
	},
	delete_portfolio_files: async function (data, options) {
		let response = [];

		// CHECK DO WE HAVE data.id ELSE RETURN ERROR
		if (!("id" in data) && typeof (data.id) === "undefined") return { internalError: 0, msg: `No id is set for Users.delete_portfolio_files` };

		let api = new ApiClass();
		await api.delete('portfolio_files/' + data.id, data);

		if (!api.response) return response['internalError'] = 'No response from api for Users.delete_portfolio_files';

		response = api.response;
		response['keyName'] = 'my_portfolio';

		if (api.response.status == 1) {
			response = await User.get_my_portfolio([], []);
		}

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];


		return response;
	},


	get_bussiness_portfolios: async function (data, options) {
		let response = [];
		let endpoint = Helpers.combineRequest('bussiness_portfolios', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Users.get_bussiness_portfolios';

		response['obj'] = api.response;
		response.keyName = 'bussiness_portfolios';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		if (options != undefined) {
			if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);
		}


		return response;
	},

	get_my_bussiness_portfolio: async function (data, options) {
		let response = [];
		let endpoint = Helpers.combineRequest('my_bussiness_portfolio', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Users.get_my_bussiness_portfolio';

		response['obj'] = api.response;
		response.keyName = 'my_bussiness_portfolio';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		if (options != undefined) {
			if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);
		}


		return response;
	},

	post_portfolios_bussiness: async function (data, options) {

		let response = [];
		let api = new ApiClass();
		await api.post('portfolios_bussiness', data);

		if (!api.response) return response['internalError'] = 'No response from api for User.post_portfolios_bussiness';

		response = api.response;


		return response;
	},

	post_subusers: async function (data, options) {

		let response = [];
		let api = new ApiClass();
		await api.post('subusers', data);

		if (!api.response) return response['internalError'] = 'No response from api for User.post_subusers';
		response = api.response;

		if (api.response.status == 1) {
			response = await User.get_subusers([], []);

		}



		return response;
	},

	get_subusers: async function (data, options) {
		let response = [];
		let endpoint = Helpers.combineRequest('subusers', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Users.get_subuserso';

		response['obj'] = api.response;
		response.keyName = 'subusers';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		if (options != undefined) {
			if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);
		}


		return response;
	},

	get_my_passport: async function (data, options) {
		let response = [];
		let endpoint = Helpers.combineRequest('my_passport', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Users.get_my_passport';

		response['obj'] = api.response;
		response.keyName = 'my_passport';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		if (options != undefined) {
			if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);
		}


		return response;
	},

	post_user_passport: async function (data, options) {

		let response = [];
		let api = new ApiClass();

		await api.post('user_passport', data);

		if (!api.response) return response['internalError'] = 'No response from api for Users.post_user_passport';

		response = api.response;
		if (api.response.status == 1) {
			response = await User.get_my_passport([], []);

		}


		response['keyName'] = 'my_passport';
		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		return response;

	},

	post_favorites: async function (data, options) {

		let response = [];
		let api = new ApiClass();

		await api.post('favorites', data);

		if (!api.response) return response['internalError'] = 'No response from api for Users.post_favorites';

		response = api.response;
		if (api.response.status == 1) {
			response = await User.get_favorites([], []);

		}


		response['keyName'] = 'favoritesPortfolios';
		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		return response;

	},

	get_favorites: async function (data, options) {
		let response = [];
		let endpoint = Helpers.combineRequest('favorites', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Users.get_favorites';

		response['obj'] = api.response;
		response.keyName = 'favoritesPortfolios';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		if (options != undefined) {
			if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);
		}


		return response;
	},

	delete_favorites: async function (data, options) {
		let response = [];

		// CHECK DO WE HAVE data.id ELSE RETURN ERROR
		if (!("id" in data) && typeof (data.id) === "undefined") return { internalError: 0, msg: `No id is set for Users.delete_favorites` };

		let api = new ApiClass();
		await api.delete('favorites/' + data.id, data);

		if (!api.response) return response['internalError'] = 'No response from api for Users.delete_favorites';


		response = api.response;

		if (api.response.status == 1) {
			response = await User.get_favorites([], []);
		}


		response['keyName'] = 'favoritesPortfolios';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];


		return response;
	},

	post_user_ratings: async function (data, options) {

		let response = [];
		let api = new ApiClass();

		await api.post('user_ratings', data);

		if (!api.response) return response['internalError'] = 'No response from api for Users.user_ratings';

		response = api.response;

		if (api.response.status == 1) {
			dataProxy.rateArtist = false;
		}


		response['keyName'] = 'user_ratings';
		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		return response;

	},
	get_user_ratings: async function (data, options) {
		let response = [];
		let endpoint = Helpers.combineRequest('user_ratings', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Users.get_user_ratings';

		response['obj'] = api.response;
		response.keyName = 'user_ratings';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		if (options != undefined) {
			if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);
		}


		return response;
	},
	get_rightToRate: async function (data, options) {
		let response = [];
		let endpoint = Helpers.combineRequest('rightToRate', data);
		let api = new ApiClass();

		await api.get(endpoint, false);

		if (!api.response) return response['internalError'] = 'No response from api for Users.rightToRate';

		response['obj'] = api.response;
		response.keyName = 'rightToRate';

		if ("keyName" in options && options['keyName'] != '' && options['keyName'] != null) response.keyName = options['keyName'];

		if (options != undefined) {
			if ("initial" in options && options['initial'] == true) return Handler.responseHandler(response);
		}


		return response;
	},


	post_portfolio_subtypes: async function (data, options) {
		let response = [];
		let api = new ApiClass();

		await api.post('portfolio_subtypes', data);

		if (!api.response) return response['internalError'] = 'No response from api for Users.portfolio_subtypes';

		response = api.response;
		// if (api.response.status == 1) {
		// 	response['url'] = '/';
		// 	dataProxy['openRegistration'] = false;
		// }

		return response;

	},










	//delete portfolio_avatars/ID
	//delete portfolio_images/ID
	//delete portfolio_passporst/ID
	//delete portfolio_files/ID
	//delete portfolio_logo/ID





};
window.User = User;
