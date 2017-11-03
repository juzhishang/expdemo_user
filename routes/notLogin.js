module.exports = function(req, res, next) {
    console.log(req.session)
  if ((!req.session) || (!req.session.user)) {
    res.send('Unauthorized', 401)
  } else {
    next()
  }
}