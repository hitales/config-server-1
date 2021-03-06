var joi = require('joi');
var Exception = require('util/exception');


module.exports = function queryValidator(schema) {
	return function* queryValidator(next) {
		if (schema.params) {
			var result = joi.validate(this.params, schema.params);
			if (result.error) {
				throw new Exception(422, { detail: result.error });
			}
			this.raw_params = this.params;
			this.params 	= result.value;
		} 
		if (schema.body) {
			var result = joi.validate(this.request.body, schema.body);
			if (result.error) {
				throw new Exception(422, { detail: result.error });
			}
			this.request.raw_body 	= this.request.body;
			this.request.body 		= result.value;
		} 
		if (schema.query) {
			var result = joi.validate(this.query, schema.query);
			if (result.error) {
				throw new Exception(422, { detail: result.error });
			}
			this.raw_query 	= this.query;
			this.query 		= result.value;
		} 
		if (schema.headers) {
			var result = joi.validate(this.headers, schema.headers);
			if (result.error) {
				throw new Exception(422, { detail: result.error });
			}
			this.raw_headers 	= this.headers;
			this.headers 		= result.value;
		}
		yield next;
	};
};