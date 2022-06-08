const CustomAPIError = require('./CustomAPIError');

class ServerError extends CustomAPIError {
	constructor(message) {
		super(message, 500);
	}
}

module.exports = ServerError;