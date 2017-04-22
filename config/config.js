"use strict";

module.exports = {
	test: {
		environment: "test",
		mongo: {
			host: "127.0.0.1",
			port: "27017",
			database: "api_test",
		},
		server: {
			host: "127.0.0.1",
			port: "3004"
		},
		mailgun: {
			domain: "sandboxf70278866c584b1980bc071d8029e646.mailgun.org",
			key: "b4bf483017fc43b2e1146d76a66932eb",
		},
		passwordReset: {
			company: "Example Team",
			from: "no-reply@example.com",
			url: "http://127.0.0.1:3004/reset-password.html"
		}
	},
	local: {
		environment: "local",
		mongo: {
			host: "127.0.0.1",
			port: "27017",
			database: "api_local",
		},
		server: {
			host: "127.0.0.1",
			port: "3003"
		},
		mailgun: {
			domain: "sandboxf70278866c584b1980bc071d8029e646.mailgun.org",
			key: "b4bf483017fc43b2e1146d76a66932eb",
		},
		passwordReset: {
			company: "Example Team",
			from: "no-reply@example.com",
			url: "http://127.0.0.1:3003/reset-password.html"
		}
	},
	dev: {
		environment: "dev",
		mongo: {
			host: "127.0.0.1",
			port: "27017",
			database: "api_dev",
		},
		server: {
			host: "127.0.0.1",
			port: "3002"
		},
		mailgun: {
			domain: "sandboxf70278866c584b1980bc071d8029e646.mailgun.org",
			key: "b4bf483017fc43b2e1146d76a66932eb",
		},
		passwordReset: {
			company: "Example Team",
			from: "no-reply@example.com",
			url: "http://127.0.0.1:3002/reset-password.html"
		}
	},
	staging: {
		environment: "staging",
		mongo: {
			host: "127.0.0.1",
			port: "27017",
			database: "api_staging",
		},
		server: {
			host: "127.0.0.1",
			port: "3001"
		},
		mailgun: {
			domain: "sandboxf70278866c584b1980bc071d8029e646.mailgun.org",
			key: "b4bf483017fc43b2e1146d76a66932eb",
		},
		passwordReset: {
			company: "Example Team",
			from: "no-reply@example.com",
			url: "http://127.0.0.1:3001/reset-password.html"
		}
	},
	prod: {
		environment: "prod",
		mongo: {
			host: "127.0.0.1",
			port: "27017",
			database: "api_prod",
		},
		server: {
			host: "127.0.0.1",
			port: "3000"
		},
		mailgun: {
			domain: "sandboxf70278866c584b1980bc071d8029e646.mailgun.org",
			key: "b4bf483017fc43b2e1146d76a66932eb",
		},
		passwordReset: {
			company: "Example Team",
			from: "no-reply@example.com",
			url: "http://127.0.0.1:3000/reset-password.html"
		}
	}
};
