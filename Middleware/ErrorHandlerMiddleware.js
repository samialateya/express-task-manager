const CustomAPIError = require('../Errors/CustomAPIError');
const ErrorHandlerMiddleware = (err, req, res, next) => {
	//?if error is a server error
	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).send({ error: err.message });
	}
	return res.status(500).json({'error' : 'server error'})
}

module.exports = ErrorHandlerMiddleware