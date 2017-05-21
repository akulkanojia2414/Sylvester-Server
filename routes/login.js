const express = require('express')
const router = express.Router()
const users = require('../controllers/users')



router.route('/signup')
  .post(users.signup)

router.route('/login')
  .post(users.login)

router.route('/updateProfile')
  .post(users.updateProfile)

router.route('/updatePassword')
  .post(users.updatePassword)

module.exports = router
