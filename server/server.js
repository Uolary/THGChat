const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./config/db.config');
const db = require('./models/index');

const PORT = process.env.PORT || 3002;
const allowlist = ['http://localhost:3002', 'http://localhost:3000'];

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
}

const app = express();

app.use(cors(corsOptionsDelegate));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.json({
    message: 'test',
  });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Successfully connect to MongoDB.');
  }).catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });
