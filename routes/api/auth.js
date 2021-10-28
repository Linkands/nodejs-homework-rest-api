const express = require('express')
const { joiSchema } = require('../../models/user')
const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')
const router = express.Router()

router.post(
  '/register',
  validation(joiSchema),
  controllerWrapper(ctrl.register),
)

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  controllerWrapper(ctrl.avatars),
)

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))

router.get('/logout', authenticate, controllerWrapper(ctrl.logout))

router.get('/current', authenticate, controllerWrapper(ctrl.current))

router.get('/verify/:verifyToken', controllerWrapper(ctrl.verify))

router.post('/verify', controllerWrapper(ctrl.resend))

module.exports = router
