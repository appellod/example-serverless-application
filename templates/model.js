"use strict";

module.exports = (name, nameCamel) => {
  const data = `"use strict";

const chance = new require('chance')();

module.exports = function(config, mongoose) {
	const Schema = mongoose.Schema;
	const schema = Schema({

	}, {
		timestamps: true
	});

	/**
	 * Creates a record with randomized required parameters if not specified.
	 * @param {Object} params The parameters to initialize the record with.
	 * @param {Callback} next The callback.
	 * @param {Object} next.record The created record.
	 */
	schema.statics.mock = function(params, next) {
		this.create(params, function(err, record) {
			if (err) console.error(err);

			next(err, record);
		});
	}

	return mongoose.model('${name}', schema);
}
`;

  return data;
};
