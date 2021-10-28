const { User } = require('../../models')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
const { sendEmail } = require('../../helpers')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Already exist')
  }
  const verifyToken = nanoid()
  const newUser = new User({ email, verifyToken })
  const verifyEmail = {
    to: email,
    subject: 'Verify your email to finish registration',
    html: `<a href="http://localhost:3000/api/auth/verify/${verifyToken}" target="_blank">Confirm email<a>`,
  }
  const avatar = gravatar.url(
    email,
    {
      s: '250',
      d: 'robohash',
    },
    true,
  )

  newUser.setPassword(password)
  newUser.setAvatar(avatar)
  await newUser.save()
  await sendEmail(verifyEmail)
  res.status(201).json({
    status: 'Success',
    code: 201,
    message: 'Registration succeed',
  })
}

module.exports = register
