const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/nodejs').catch((err) => console.log(err));

const userRouter = require('./router/users');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'Halaman utama',
    username: 'Nibras',
  });
});

app.get('/about', (req, res) => {
  res.render('pages/about', {
    title: 'Halaman about',
  });
});

app.use(userRouter);

app.listen(port, () => {
  console.log('listening to port ' + port);
});
