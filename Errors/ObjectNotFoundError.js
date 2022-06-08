const CustomAPIError = require("./CustomAPIError");

class ObjectNotFoundError extends CustomAPIError {
	constructor(message) {
		super(message, 404);
		this.name = 'ObjectNotFoundError';
	}
}

module.exports = ObjectNotFoundError;