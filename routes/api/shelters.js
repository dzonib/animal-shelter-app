const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport')

const Shelter = require('../../models/shelter')
const router = express.Router();
const ValidateRegisterInput = require('../../validate/shelter/register');
const ValidateLoginInput = require('../../validate/shelter/login');
const keyOrSecret = require('../../config/jwtsecret').keyOrSecret

// test
router.get('/test', (req, res) => {
  res.send({alive: true})
})

// get shelter
router.post('/create', async(req, res) => {

  const {errors, isValid} = ValidateRegisterInput(req.body)

  if (!isValid) {
    return res
      .status(400)
      .json(errors);
  }

  const {
    city,
    name,
    email,
    address,
    password,
    password2
  } = req.body;

  try {
    const shelter = await Shelter.findOne({name});

    if (shelter) {
      return res
        .status(400)
        .json({error: 'Shelter already registered'});
    }

    const newShelter = new Shelter({
      city,
      name,
      address,
      email,
      password,
      password2
    });

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(newShelter.password, salt);

    newShelter.password = hash;

    await newShelter.save();

    res.json({success: true, newShelter});

  } catch (e) {
    errors.error = `Something went wrong --> ${e}`
    res
      .status(400)
      .json(errors)
  }
});

// login (get token)

router.post('/login', async(req, res) => {

  const {errors, isValid} = ValidateLoginInput(req.body);

  if (!isValid) {
    return res
      .status(400)
      .json(errors);
  }

  const {email, password} = req.body;

  try {
    const user = await Shelter.findOne({email});

    if (!user) {
      errors.user = `User with email: "${email}" is not registerd`;
      return res
        .status(404)
        .json(errors)
    };
  
    const isMatched = await bcrypt.compare(password, user.password);
  
    if (isMatched) {
  
      const payload = {
        id: user.id,
        city: user.city,
        name: user.name,
        email: user.email
      };
  
      const token = await jwt.sign(payload, keyOrSecret, {expiresIn: 3600});
  
      res.json(`Bearer ${token}`);
    }
  
    errors.password = 'Wrong password';
    res
      .status(400)
      .json(errors);
  } catch(e) {
    console.log(`Error --> ${e}`);
  }
});

router.get('/logged', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send(req.user)
})

module.exports = router