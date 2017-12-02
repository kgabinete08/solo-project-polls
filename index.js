const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const pollsController = require('./server/controllers/pollsController');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/client`));

app.get('/api/polls', (req, res) => {
  pollsController.getPolls(req, res);
});

app.post('/api/polls', (req, res) => {
  pollsController.updatePoll(req, res);
});

app.post('/api/create', (req, res) => {
  pollsController.createPoll(req, res);
});

app.listen(7777);
