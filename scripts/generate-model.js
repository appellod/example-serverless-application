/**
 * Generates a model and test file for the given model name.
 * @arg {String} name The name of the model.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const pluralize = require("pluralize");

// make sure we have an argument
if (!process.argv[2]) {
	console.error(new Error("Please define a model name."));
	process.exit(1);
}

// make sure model name is only letters
let regex = /^[a-zA-Z]+$/
if (!regex.test(process.argv[2])) {
	console.error(new Error("Model name must consist of only letters."));
	process.exit(1);
}

const name = process.argv[2].substring(0, 1).toUpperCase() + process.argv[2].slice(1);
const nameCamel = name.substring(0, 1).toLowerCase() + name.slice(1);

const modelTemplate = path.resolve(__dirname + "/../templates/model");
const testTemplate = path.resolve(__dirname + "/../templates/model-test");
const modelData = require(modelTemplate)(name, nameCamel);
const testData = require(testTemplate)(name, nameCamel);

const modelPath = path.resolve(__dirname + "/../models/" + nameCamel + ".js");
const testPath = path.resolve(__dirname + "/../test/models/" + nameCamel + ".js");

if (!fs.existsSync(modelPath)) {
	fs.writeFileSync(modelPath, modelData);
	console.log("Generated model file at:", modelPath);
} else {
	console.log("Model file already exists at:", modelPath);
}

if (!fs.existsSync(testPath)) {
	fs.writeFileSync(testPath, testData);
	console.log("Generated test file at:", testPath);
} else {
	console.log("Test file already exists at:", testPath);
}
