const express = require('express');
const app = express();

const cors = require('cors');
const sets = require('./routes/sets');
const home = require('./routes/home');

// Middle wares
app.use(cors());
app.use(express.json());

// Router
app.use('/', home);
app.use('/sets', sets);

app.listen(5000, () => {
  console.log('Listing in port 5000');
});
