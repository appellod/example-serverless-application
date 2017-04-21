"use strict";

const chai = require('chai');
const chaiHttp = require('chai-http');

module.exports = (config, mongoose) => {
  const User = mongoose.model("User");

	chai.use(chaiHttp);

	return {
    /**
     * Finds the test user and returns it.
     * @param {Callback} next The callback.
     * @param {Object} next.testUser The test user.
     */
		getTestUser: (next) => {
			User.findOne({ email: "test@example.com" }, (err, testUser) => {
				if (err) console.error(err);

				return next(err, testUser);
			});
		},

    /**
     * Send a request to the test API.
     * @param {String} method The HTTP method. (ex: "get", "post", "put", "delete")
     * @param {String} path The relative path of the API endpoint. (ex: "/users")
     * @param {Object} params An object of all the key-value pairs to send as the query or body parameters.
     * @param {String} email The user's email address to send request with. Pass null to not supply token in header.
     * @param {Callback} next The callback.
     * @param {Object} next.res The response from the API.
     */
		request: (method, path, params, email, next) => {
      let token;
      let promise = new Promise((res, rej) => {
        if (email) {
          User.findOne({ email: email }, (err, user) => {
            if (err) console.error(err);

            if (user) {
              token = user.tokens[0]._id;
              res();
            } else {
              let err = new Error("User with email " + email + " not found.");
              rej(err);
            }
          });
        } else {
          res();
        }
      });

      promise.then(() => {
        // if using GET, add params to query string and return proper HTTP function
  	    if ( method == "get" || method == "delete" ) {
  	      if ( params ) {
  	        let query = encodeURIComponent(JSON.stringify(params));
  	        path += "?query=" + query;
  	      }
  	    }

        let request = chai.request(config.server.host + ":" + config.server.port)
  				[method]("/v1" + path)

        if (token) {
          request.set("Authorization", "Bearer " + token);
        }

  			if ((method == "post" || method == "put") && params) {
  				request.send(params);
  			}

        request.end((err, res) => {
  				return next(err, res);
  			});
      });

      promise.catch((err) => {
        return next(err);
      });
		}
	}
};
