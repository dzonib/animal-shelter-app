const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.set('useFindAndModify', false);

const shelterRoute = require('./routes/api/shelters');


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


app.use('/api/shelter', shelterRoute)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App running on http://localhost:${port}`));