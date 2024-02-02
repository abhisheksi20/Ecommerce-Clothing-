const notFound = (req,res) => res.status(404).send('No route is found')

module.exports = notFound