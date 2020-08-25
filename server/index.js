const express = require('express');
const app = express();

const cors = require('cors');
const set = require('./routes/set')

// Middle wares
app.use(cors());
app.use(express.json());

// Router
app.use('/set', set);


app.listen(5000, () => {
  console.log('Listing in port 5000');
})
