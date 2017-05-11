"use strict";

module.exports = function(name, namePlural, nameCamel, nameCamelPlural, nameFormal, nameFormalPlural, attributes) {
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
	 * @api {get} /${nameCamelPlural} Get ${nameFormalPlural}
	 * @apiName Get${namePlural}
	 * @apiGroup ${namePlural}
	 * @apiDescription Returns an array of ${nameFormalPlural}.
	 *
	 * @apiParam {Number} limit Number of records to return.
	 * @apiParam {String} select A string of fields to select separated by spaces.
	 * @apiParam {Number} skip Number of records to skip.
	 * @apiParam {String} sort The sorting of the records.
	 * @apiParam {Object} where The where clause for the query.
	 *
	 * @apiSuccess {Array} ${nameCamelPlural} Array of ${nameFormalPlural} matching the criteria.
	 */
	router.get('/${nameCamelPlural}', passport.authenticate('bearer', { session: false }), (req, res) => {
		${name}
			.find(req.query.where)
			.sort(req.query.sort)
			.skip(req.query.skip)
			.limit(req.query.limit)
			.select(req.query.select)
			.exec((err, ${nameCamelPlural}) => {
				if (err) {
					res.status(400).json({ error: err.message });
				} else {
					res.json({ ${nameCamelPlural}: ${nameCamelPlural} });
				}
			});
	});

	/**
	 * @api {post} /${nameCamelPlural} Create ${nameFormal}
	 * @apiName Create${name}
	 * @apiGroup ${namePlural}
	 * @apiDescription Creates and returns a new ${nameFormal}.
	 *
${attributesDocumentation}
	 *
	 * @apiSuccess {Object} ${nameCamel} The new ${nameFormal}.
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
	 * @api {get} /${nameCamelPlural}/:id Get ${nameFormal}
	 * @apiName Get${name}
	 * @apiGroup ${namePlural}
	 * @apiDescription Returns a ${nameFormal} by ID.
	 *
	 * @apiParam {String} :id The ID of the ${nameFormal}.
	 *
	 * @apiSuccess {Object} ${nameCamel} The ${nameFormal} matching the given ID.
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
	 * @api {put} /${nameCamelPlural}/:id Update ${nameFormal}
	 * @apiName Update${name}
	 * @apiGroup ${namePlural}
	 * @apiDescription Updates and returns a ${nameFormal}.
	 *
	 * @apiParam {String} :id The ID of the ${nameFormal}.
${attributesDocumentation}
	 *
	 * @apiSuccess {Object} ${nameCamel} The updated ${nameFormal}.
	 */
	router.put('/${nameCamelPlural}/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
		${name}.findOne({ _id: req.params.id }, (err, ${nameCamel}) => {
			if (err) {
				res.status(400).json({ error: err.message });
			} else if (!${nameCamel}) {
				res.status(400).json({ error: "${name} not found." });
			} else {
				for (let key in req.body) {
					${nameCamel}[key] = req.body[key];
				}

				${nameCamel}.save((err, ${nameCamel}) => {
					if (err) {
						res.status(400).json({ error: err.message });
					} else {
						res.json({ ${nameCamel}: ${nameCamel} });
					}
				});
			}
		});
	});

	/**
	 * @api {delete} /${nameCamelPlural}/:id Remove ${nameFormal}
	 * @apiName Remove${name}
	 * @apiGroup ${namePlural}
	 * @apiDescription Removes a ${nameFormal}.
	 *
	 * @apiParam {String} :id The ID of the ${nameFormal}.
	 */
	router.delete('/${nameCamelPlural}/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
		${name}.findOne({ _id: req.params.id }, (err, ${nameCamel}) => {
			if (err) {
				res.status(400).json({ error: err.message });
			} else if (!${nameCamel}) {
				res.status(400).json({ error: "${name} not found." });
			} else {
				${nameCamel}.remove((err, ${nameCamel}) => {
					if (err) {
						res.status(400).json({ error: err.message });
					} else {
						res.json({ message: "${name} removed successfully." });
					}
				});
			}
		});
	});
};`;

	return data;
};
