var express = require('express');
var app = express();
var cors = require('cors')

app.use(cors());

app.get('/', function (req, res) {
  res.json({ message: 'Hello World!' });
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
