const sendSuccessResponse = (res, data = null, status = 200) => {
  res.status(status).json({
    status: 'success',
    code: status,
    data,
  })
}

module.exports = sendSuccessResponse
