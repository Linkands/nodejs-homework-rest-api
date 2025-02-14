const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true },
)

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const { SECRET_KEY } = process.env

userSchema.methods.createToken = function () {
  const payload = {
    _id: this._id,
  }
  return jwt.sign(payload, SECRET_KEY)
}

userSchema.methods.setAvatar = function (avatar) {
  this.avatarURL = avatar
}

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema,
}
