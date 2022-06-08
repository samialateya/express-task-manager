const CustomAPIError = require('./CustomAPIError');
class ObjectUniquenessError extends CustomAPIError {
	constructor(message) {
		super(message,409);
		this.name = 'ObjectUniquenessError';
	}
}

module.exports = ObjectUniquenessError;