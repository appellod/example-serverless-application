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
	attributeAssertions = attributeAssertions.replace("				", "");
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

describe("controllers/${nameCamelPlural}.js", function() {
	describe("GET /${nameCamelPlural}", function() {
		beforeEach(async function() {
            await ${name}.mock({});
		});

		it("returns all ${nameCamelPlural}", async function() {
			const method = "get";
			const path = "/${nameCamelPlural}";
			const params = null;

			const res = await api.request(method, path, params, "test@example.com");
            expect(res.status).to.eq(200);

			expect(res.body.${nameCamelPlural}.length).to.be.above(0);
		});
	});

	describe("POST /${nameCamelPlural}", function() {
		it("creates a new ${nameCamel}", async function() {
			const method = "post";
			const path = "/${nameCamelPlural}";
			const params = {
        		email: chance.email(),
    			password: chance.hash()
      		};

            const res = await api.request(method, path, params, "test@example.com");
            expect(res.status).to.eq(200);

			${attributeAssertions}
		});
	});

	describe("GET /${nameCamelPlural}/:id", function() {
		let ${nameCamel};

		beforeEach(async function() {
            ${nameCamel} = await ${name}.mock({});
		});

		it("returns the ${nameCamel}", async function() {
			const method = "get";
			const path = "/${nameCamelPlural}/" + ${nameCamel}._id;
			const params = null;

            const res = await api.request(method, path, params, "test@example.com");
            expect(res.status).to.eq(200);

			expect(res.body.${nameCamel}._id).to.eq(${nameCamel}._id.toString());
		});
	});

	describe("PUT /${nameCamelPlural}/:id", function() {
		let ${nameCamel};

		beforeEach(async function() {
            ${nameCamel} = await ${name}.mock({});
		});

		it("updates and returns the ${nameCamel}", async function() {
			const method = "put";
			const path = "/${nameCamelPlural}/" + ${nameCamel}._id;
			const params = {
				email: chance.email(),
			};

            const res = await api.request(method, path, params, "test@example.com");
            expect(res.status).to.eq(200);

			${attributeAssertions}
		});
	});

	describe("DELETE /${nameCamelPlural}/:id", function() {
		let ${nameCamel};

		beforeEach(async function() {
            ${nameCamel} = await ${name}.mock({});
		});

		it("returns a 200 status", async function() {
			const method = "delete";
			const path = "/${nameCamelPlural}/" + ${nameCamel}._id;
			const params = null;

            const res = await api.request(method, path, params, "test@example.com");
            expect(res.status).to.eq(200);
		});
	});
});
`;

	return data;
};
