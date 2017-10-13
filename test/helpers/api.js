"use strict";

const chai = require('chai');
const chaiHttp = require('chai-http');

module.exports = function(config, mongoose) {
	const User = mongoose.model("User");

	chai.use(chaiHttp);

    /**
     * Finds the test user and returns it.
     * @return {Promise.<Object>} The test user.
     */
	async function getTestUser() {
        const user = await User.findOne({ email: "test@example.com" });

        return user;
	}

    /**
     * Send a request to the test API.
     * @param {String} method The HTTP method. (ex: "get", "post", "put", "delete")
     * @param {String} path The relative path of the API endpoint. (ex: "/users")
     * @param {Object} params An object of all the key-value pairs to send as the query or body parameters.
     * @param {String} email The user's email address to send request with. Pass null to not supply token in header.
     * @return {Promise.<Object>} The response from the API.
     */
	async function request(method, path, params, email) {
		let token;

        if (email) {
            const user = await User.findOne({ email });

            token = user.tokens[0]._id;
        }

		// if using GET, add params to query string and return proper HTTP function
		if ( method == "get" || method == "delete" ) {
			if ( params ) {
				const query = encodeURIComponent(JSON.stringify(params));
				path += "?query=" + query;
			}
		}

		const request = chai.request(config.server.host + ":" + config.server.port)
		[method]("/v1" + path)

		if (token) {
			request.set("Authorization", "Bearer " + token);
		}

		if ((method == "post" || method == "put") && params) {
			request.send(params);
		}

        return new Promise((res, rej) => {
            request.end((err, response) => {
                return res(response);
            });
        });
	}

	return { getTestUser, request };
};
