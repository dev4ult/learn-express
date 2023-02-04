const bodyParser = require('body-parser');
const express = require('express');
const userRouter = require('./router/users');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const logHelloWorld = (req, res, next) => {
  console.log('Hello World');
  next();
};

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'Halaman utama',
    username: 'Nibras',
  });
});

app.get('/about', (req, res) => {
  res.redirect('https://expressjs.com/');
});

app.use(logHelloWorld);

app.use(userRouter);

app.listen(port, () => {
  console.log('listening to port ' + port);
});
