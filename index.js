const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')

mongoose.set('useFindAndModify', false);

const shelterRoute = require('./routes/api/shelters');
const animalRoute = require('./routes/api/animals');


try {
  const dbIniter = async() => {
    await mongoose.connect('mongodb://kingkong:kingkong5@ds125422.mlab.com:25422/express-animal', 
    {useNewUrlParser: true});
    console.log('Connected to db');
  }

  dbIniter();

} catch (e) {
  console.log(`Error --> ${e}`)
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/animal', animalRoute);
app.use('/api/shelter', shelterRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App running on http://localhost:${port}`));