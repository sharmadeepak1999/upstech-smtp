const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()

const apiRoutes = require('./src/routes/api');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
