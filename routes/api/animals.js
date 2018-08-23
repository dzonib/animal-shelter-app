const express = require('express');
const passport = require('passport');
const Shelter = require('../../models/shelter');
const Animal = require('../../models/animal');

const router = express.Router();

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {

  const {type, name, age, image, date} = req.body;

  const errors = {};

  const animalData = {
    shelter: req.user.id,
    type,
    name,
    age,
    image,
    date
  }

  try {
    const animal = await Animal.findOne({shelter: req.user.id})

    // if (!animal) {
    //   errors.animal = 'There are no registered animals in this shelter';
    //   res.status(404).json(errors)
    // }

    if (animal) {
      await Animal.findOneAndUpdate({shelter: req.user.id}, {$set: animalData}, {new: true})
      return res.json(animal)
    } else {
        const newAnimal = new Animal(animalData)

        // POPULATE BEFORE YOU SAVE!!!!!!

        await newAnimal.save()

      return res.json(newAnimal)
    }
  } catch(e) {
    console.log(`Error --> ${e}`)
    res.status(400).json({error: 'App broke :`('})
  }
});



module.exports = router;