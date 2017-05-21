const User = require('../models/users')



exports.login = (req, res, next) => {

  let email = req.body.email
  let pass = req.body.pass

  User.findOne({ email: email })
  .then((user) => {
    // console.log(user)

    if(user.password === pass){
      console.log("User is Login")
      res.json(user)
    }else{
      console.log("Wrong Credentials")
      res.status(400).send('User is not valid')
    }

  })
  .catch((err) => {
    console.log(err)
    next(err)
  })

}


exports.updatePassword = (req, res, next) => {

  let email = req.body.email
  let pass = req.body.oldpass
  let newpass = req.body.newpass
  let newpassverify = req.body.newpassverify

  if (newpass !== newpassverify) {
    return res.status(400).send('Password Are not same')
  }

  User.findOne({ email: email }, (err, user) => {

    if(err){
      console.log(err)
      return res.status(500).send('Something went wrong')
    }
    if(!user){
      return res.status(500).send('User Not exist')
    }

    if(user.password === pass){
      user.password = newpass
      user.save((err, updatedUser) => {
        if (err) {
          return console.log(err)
        }
        res.send({ statusCode: 200 })
      })
    }else{
      return res.json({ statusCode: 614, err: 'Existing password does not match' })
    }

  })

}


exports.updateProfile = (req, res, next) => {

  let email = req.body.email
  let pass = req.body.pass

  let phone = req.body.phone
  // for further details updation we can use like this
  // let name = req.body.name || ''

  User.findOneAndUpdate({ email: email },{ $set: { phone: phone } }, { new: true }).exec()
  .then((user) => {
    res.json(user)
  })
  .catch((err) => {
    console.log(err)
    next(err)
  })

}


exports.signup = (req, res, next) => {

  let email = req.body.email
  let pass = req.body.pass
  let name = req.body.name
  let phone = req.body.phone

  if (pass && pass.length < 6) {
    return res.status(400).send('Password is not valid')
  }

  let users = new User({
    name: name,
    email: email,
    phone: phone,
    password: pass
  })

  users.save()
  .then((user) => {
    res.json(user)
  })
  .catch((err) => {
    console.log(err)
    next()
  })

}
