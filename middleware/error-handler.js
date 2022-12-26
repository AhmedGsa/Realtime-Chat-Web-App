const CustomAPIError = require('../errors/custom-error')
const {StatusCodes} = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    msg: err.message || "Something went wrong, Please try again later!",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  }
  if(err.name==="ValidationError") {
    customError.msg =  Object.values(err.errors).map((item) => item.message).join(", ")
    customError.statusCode = 400
  }
  if(err.name==="CastError") {
    customError.msg =  "ID Not Valid"
    customError.statusCode = 404
  }
  if (err.code && err.code === 11000) {
    if(err.keyValue.username) {
      customError.msg = `${err.keyValue.username} is already used, please provide another one`
    }
    if(err.keyValue.email) {
      customError.msg = `${err.keyValue.email} is already used, please provide another one`
    }
    customError.statusCode = 404
  }
  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware