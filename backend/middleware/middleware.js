const jwt = require('jsonwebtoken')

exports.authUser = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.send({ status: 2, message: 'You are not logged in' })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.send({ status: 3, message: 'Unauthorized' })
    req.user = user
    next()
  })
}