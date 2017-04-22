"use strict";

module.exports = function(name, namePlural, nameCamel, nameCamelPlural, attributes) {
	const ignore = [
		"_id",
		"__v",
		"createdAt",
		"updatedAt"
	];

	let attributesDocumentation = "";
	for (let key in attributes) {
		let attr = attributes[key];

		if (!ignore.includes(key)) {
			attributesDocumentation += "	 * @apiParam {" + attr.instance + "} " + key + " <i>Awaiting Documentation</i>\n";
		}
	}
	attributesDocumentation = attributesDocumentation.replace("     ", "");
	attributesDocumentation = attributesDocumentation.substring(0, attributesDocumentation.length - 1);

	const data = `"use strict";

module.exports = function(app, mongoose, passport, router) {
	const ${name} = mongoose.model("${name}");

	/**
	 * @api {get} /${nameCamelPlural} Get ${namePlural}
	 * @apiName Get${namePlural}
	 * @apiGroup ${namePlural}
	 * @apiDescription Returns an array of ${nameCamelPlural}.
	 *
	 * @apiParam {Number} limit Number of records to return.
	 * @apiParam {Number} skip Number of records to skip.
	 * @apiParam {String} sort The sorting of the records.
	 * @apiParam {Object} where The where clause for the query.
	 *
	 * @apiSuccess {Array} ${nameCamelPlural} Array of ${nameCamelPlural} matching the criteria.
	 */
	router.get('/${nameCamelPlural}', passport.authenticate('bearer', { session: false }), (req, res) => {
		${name}
			.find(req.query.where)
			.sort(req.query.sort)
			.skip(req.query.skip)
			.limit(req.query.limit)
			.exec((err, ${nameCamelPlural}) => {
				if (err) {
					res.status(400).json({ error: err.message });
				} else {
					res.json({ ${nameCamelPlural}: ${nameCamelPlural} });
				}
			});
	});

	/**
	 * @api {post} /${nameCamelPlural} Create ${name}
	 * @apiName Create${name}
	 * @apiGroup ${namePlural}
	 * @apiDescription Creates and returns a new ${nameCamel}.
	 *
${attributesDocumentation}
	 *
	 * @apiSuccess {Object} ${nameCamel} The new ${nameCamel}.
	 */
	router.post('/${nameCamelPlural}', passport.authenticate('bearer', { session: false }), (req, res) => {
		${name}.create(req.body, (err, ${nameCamel}) => {
			if (err) {
				res.status(400).json({ error: err.message });
			} else {
				res.json({ ${nameCamel}: ${nameCamel} });
			}
		});
	});

	/**
	 * @api {get} /${nameCamelPlural}/:id Get ${name}
	 * @apiName Get${name}
	 * @apiGroup ${namePlural}
	 * @apiDescription Returns a ${nameCamel} by ID.
	 *
	 * @apiParam {String} :id The ID of the ${nameCamel}.
	 *
	 * @apiSuccess {Object} ${nameCamel} The ${nameCamel} matching the given ID.
	 */
	router.get('/${nameCamelPlural}/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
		${name}.findOne({ _id: req.params.id }, (err, ${nameCamel}) => {
			if (err) {
				res.status(400).json({ error: err.message });
			} else {
				res.json({ ${nameCamel}: ${nameCamel} });
			}
		});
	});

	/**
	 * @api {put} /${nameCamelPlural}/:id Update ${name}
	 * @apiName Update${name}
	 * @apiGroup ${namePlural}
	 * @apiDescription Updates and returns a ${nameCamel}.
	 *
	 * @apiParam {String} :id The ID of the ${nameCamel}.
${attributesDocumentation}
	 *
	 * @apiSuccess {Object} ${nameCamel} The updated ${nameCamel}.
	 */
	router.put('/${nameCamelPlural}/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
		${name}.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, ${nameCamel}) => {
			if (err) {
				res.status(400).json({ error: err.message });
			} else {
				res.json({ ${nameCamel}: ${nameCamel} });
			}
		});
	});

	/**
	 * @api {delete} /${nameCamelPlural}/:id Remove ${name}
	 * @apiName Remove${name}
	 * @apiGroup ${namePlural}
	 * @apiDescription Removes a ${nameCamel}.
	 *
	 * @apiParam {String} :id The ID of the ${nameCamel}.
	 */
	router.delete('/${nameCamelPlural}/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
		${name}.remove({ _id: req.params.id }, (err, result) => {
			if (err) {
				res.status(400).json({ error: err.message });
			} else if (result.result.n == 0) {
				let err = new Error("${name} not found.");
				res.status(400).json({ error: err.message });
			} else {
				res.json({ message: "${name} removed successfully." });
			}
		});
	});
};`;

	return data;
};
