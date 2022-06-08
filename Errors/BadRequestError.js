const CustomAPIError = require("./CustomAPIError");

class BadRequestError extends CustomAPIError{
	constructor(message) {
		super(message, 422);
		this.name = 'BadRequestError';
	}
}

module.exports = BadRequestError;