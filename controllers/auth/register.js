const { User } = require('../../models')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Already exist')
  }
  const avatar = gravatar.url(
    email,
    {
      s: '250',
      d: 'robohash',
    },
    true,
  )
  const newUser = new User({ email })
  newUser.setPassword(password)
  newUser.setAvatar(avatar)
  await newUser.save()
  res.status(201).json({
    status: 'Success',
    code: 201,
    message: 'Registration succeed',
  })
}

module.exports = register
