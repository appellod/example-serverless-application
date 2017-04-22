"use strict";

module.exports = function(name, namePlural, nameCamel, nameCamelPlural, attributes) {
	const ignore = [
		"_id",
		"__v",
		"createdAt",
		"updatedAt"
	];

	let attributeParams = "";
	for (let key in attributes) {
		let attr = attributes[key];

		if (!ignore.includes(key) && key.indexOf(".") < 0) {
			if (attr.instance == "String") {
				attributeParams += "        " + key + ": chance.word(),\n";
			} else if (attr.instance == "Number") {
				attributeParams += "        " + key + ": chance.integer(),\n";
			} else if (attr.instance == "Boolean") {
				attributeParams += "        " + key + ": chance.bool(),\n";
			}
		}
	}
	attributeParams = attributeParams.replace("        ", "");
	attributeParams = attributeParams.substring(0, attributeParams.length - 2);

	let attributeAssertions = "";
	for (let key in attributes) {
		let attr = attributes[key];

		if (!ignore.includes(key) && key.indexOf(".") < 0) {
			if (attr.instance == "String" || attr.instance == "Number" || attr.instance == "Boolean") {
				attributeAssertions += "				expect(res.body." + nameCamel + "." + key + ").to.eq(params." + key + ");\n";
			}
		}
	}
	attributeAssertions = attributeAssertions.replace("        ", "");
	attributeAssertions = attributeAssertions.substring(0, attributeAssertions.length - 1);

	const data = `"use strict";

const chai = require('chai');
const chance = new require('chance')();

// set up test suite and import models
const bs = require("../bootstrap");
const ${name} = bs.mongoose.model("${name}");

const expect = chai.expect;

// make API calls a little easier
const api = require("../helpers/api")(bs.config, bs.mongoose);

describe("controllers/${nameCamelPlural}.js", () => {
	describe("GET /${nameCamelPlural}", () => {
		beforeEach((done) => {
			${name}.mock({}, (${nameCamel}) => {
				return done();
			});
		});

		it("returns all ${nameCamelPlural}", (done) => {
			let method = "get";
			let path = "/${nameCamelPlural}";
			let params = null;

			api.request(method, path, params, "test@example.com", (err, res) => {
				expect(res.status).to.eq(200);

				expect(res.body.${nameCamelPlural}.length).to.be.above(0);

				done();
			});
		});
	});

	describe("POST /${nameCamelPlural}", () => {
		it("creates a new ${nameCamel}", (done) => {
			let method = "post";
			let path = "/${nameCamelPlural}";
			let params = {
	    		${attributeParams}
	  		};

			api.request(method, path, params, "test@example.com", (err, res) => {
				expect(res.status).to.eq(200);

				${attributeAssertions}

				done();
			});
		});
	});

	describe("GET /${nameCamelPlural}/:id", () => {
		let ${nameCamel};

		beforeEach((done) => {
			${name}.mock({}, (err, _${nameCamel}) => {
				${nameCamel} = _${nameCamel};

				return done();
			});
		});

		it("returns the ${nameCamel}", (done) => {
			let method = "get";
			let path = "/${nameCamelPlural}/" + ${nameCamel}._id;
			let params = null;

			api.request(method, path, params, "test@example.com", (err, res) => {
				expect(res.status).to.eq(200);

				expect(res.body.${nameCamel}._id).to.eq(${nameCamel}._id.toString());

				done();
			});
		});
	});

	describe("PUT /${nameCamelPlural}/:id", () => {
		let ${nameCamel};

		beforeEach((done) => {
			${name}.mock({}, (err, _${nameCamel}) => {
				${nameCamel} = _${nameCamel};

				return done();
			});
		});

		it("updates and returns the ${nameCamel}", (done) => {
			let method = "put";
			let path = "/${nameCamelPlural}/" + ${nameCamel}._id;
			let params = {
				${attributeParams}
			};

			api.request(method, path, params, "test@example.com", (err, res) => {
				expect(res.status).to.eq(200);

				${attributeAssertions}

				done();
			});
		});
	});

	describe("DELETE /${nameCamelPlural}/:id", () => {
		let ${nameCamel};

		beforeEach((done) => {
			${name}.mock({}, (err, _${nameCamel}) => {
				${nameCamel} = _${nameCamel};

				return done();
			});
		});

		it("returns a 200 status", (done) => {
			let method = "delete";
			let path = "/${nameCamelPlural}/" + ${nameCamel}._id;
			let params = null;

			api.request(method, path, params, "test@example.com", (err, res) => {
				expect(res.status).to.eq(200);

				done();
			});
		});
	});
});`;

	return data;
};
