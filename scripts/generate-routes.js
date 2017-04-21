/**
 * Generates a route and test file for the given model file.
 * @arg {String} file The filename of the model to generate routes for.
 */

"use strict";

const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
const pluralize = require("pluralize");

if (!process.argv[2]) {
	console.error(new Error("Please define a model file."));
	process.exit(1);
}

const file = process.argv[2];
const models = path.resolve(__dirname + "/../models/" + file);
const model = require(models)({}, mongoose);
const name = model.modelName;
const namePlural = pluralize(name);
const nameCamel = name.substring(0, 1).toLowerCase() + name.slice(1);
const nameCamelPlural = namePlural.substring(0, 1).toLowerCase() + namePlural.slice(1);
const attributes = model.schema.paths;

const routeTemplate = path.resolve(__dirname + "/../templates/routes");
const testTemplate = path.resolve(__dirname + "/../templates/routes-test");
const routeData = require(routeTemplate)(name, namePlural, nameCamel, nameCamelPlural, attributes);
const testData = require(testTemplate)(name, namePlural, nameCamel, nameCamelPlural, attributes);

const routePath = path.resolve(__dirname + "/../routes/" + nameCamelPlural + ".js");
const testPath = path.resolve(__dirname + "/../test/routes/" + nameCamelPlural + ".js");

if (!fs.existsSync(routePath)) {
	fs.writeFileSync(routePath, routeData);
	console.log("Generated route file at:", routePath);
} else {
	console.log("Route file already exists at:", routePath);
}

if (!fs.existsSync(testPath)) {
	fs.writeFileSync(testPath, testData);
	console.log("Generated test file at:", testPath);
} else {
	console.log("Test file already exists at:", testPath);
}
