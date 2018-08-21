const express = require('express');
const bcrypt = require('bcryptjs');

const Shelter = require('../../models/shelter')
const router = express.Router();
const ValidateRegisterInput = require('../../validate/shelter/register');

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

  const {city, name, email, address, password} = req.body;

  try {
    const shelter = await Shelter.findOne({name});

    if (shelter) {
      return res
        .status(400)
        .json({error: 'Shelter already registered'});
    }

    const newShelter = new Shelter({city, name, address, email, password, password2});

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

module.exports = router