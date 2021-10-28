const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const avatars = require('./avatars')
const verify = require('./verify')
const resend = require('./resend')

module.exports = {
  register,
  login,
  logout,
  current,
  avatars,
  verify,
  resend,
}
