const User = require("../models/Users");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  // check if there are validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  // extract email and password
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    // check if user exists
    if (!user) return res.status(400).json({msg: 'User does not exists'});
    
    // check password
    const correctPassword = await bcryptjs.compare(password, user.password);

    if (!correctPassword) return res.status(400).json({mes: 'Wrong password'})

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
    console.error(error);
  }

};

// gets authenticated user
exports.authenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({msg: 'Error'})
  }
}