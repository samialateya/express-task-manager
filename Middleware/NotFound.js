const notFound = (req, res) => res.status(404).send({error : 'route not found'});

module.exports = notFound