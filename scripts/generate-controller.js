/**
 * Generates a controller and test file for the given model file.
 * @arg {String} file The filename of the model to generate controllers for.
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
const nameFormal = name.replace(/([A-Z])/g, ' $1').trim();
const nameFormalPlural = namePlural.replace(/([A-Z])/g, ' $1').trim();
const attributes = model.schema.paths;

const controllerTemplate = path.resolve(__dirname + "/../templates/controller");
const testTemplate = path.resolve(__dirname + "/../templates/controller-test");
const controllerData = require(controllerTemplate)(name, namePlural, nameCamel, nameCamelPlural, nameFormal, nameFormalPlural, attributes);
const testData = require(testTemplate)(name, namePlural, nameCamel, nameCamelPlural, attributes);

const controllerPath = path.resolve(__dirname + "/../controllers/" + nameCamelPlural + ".js");
const testPath = path.resolve(__dirname + "/../test/controllers/" + nameCamelPlural + ".js");

if (!fs.existsSync(controllerPath)) {
	fs.writeFileSync(controllerPath, controllerData);
	console.log("Generated controller file at:", controllerPath);
} else {
	console.log("Controller file already exists at:", controllerPath);
}

if (!fs.existsSync(testPath)) {
	fs.writeFileSync(testPath, testData);
	console.log("Generated test file at:", testPath);
} else {
	console.log("Test file already exists at:", testPath);
}
