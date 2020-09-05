const User = require('../models/Users');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

  // check if there are validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  // get email and password from request
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({msg: 'User already exists'})

    // create user
    user = new User(req.body);

    // password hash
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    // save user
    await user.save();

    //create an sign token
    const payload = {
      user: {
        id: user.id
      }
    };

    //sign jwt
    jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: 3600,
    }, (error, token) => {
      if (error) throw error;
      res.json({token});
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({msg: 'Error'})
  }
}