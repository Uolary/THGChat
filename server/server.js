const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./config/db.config');
const db = require('./models/index');

const PORT = process.env.PORT || 3002;

const corsOptions = {
  origin: 'http://localhost:3002',
};

const app = express();

app.use(cors(corsOptions));

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
