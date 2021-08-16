const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next) => {
  const jwtToken = req.header("token")
  if(!jwtToken){
    return res.status(403).json({ msg: "authorization denied" });
  }
  try {
    const verify = jwt.verify(jwtToken, process.env.JWT_SECRET)
    req.user = verify.user
    next()
  } catch (err){
    console.log(err.message)
  }
}