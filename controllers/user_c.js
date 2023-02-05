const { readFileSync, writeFileSync } = require('fs');
const userModel = require('../model/user_m');

const file = './data/users.json';

module.exports = {
  index: (req, res) => {
    userModel.readAllUser().then((users) => {
      res.render('users/index', { users, title: 'List User' });
    });
  },

  detail: (req, res) => {
    const users = getUsers();
    const paramsUID = parseInt(req.params.uid);
    if (mapUID().includes(paramsUID)) {
      const user = users.filter((user) => user.id == paramsUID)[0];
      console.log(user);
      res.render('users/detail', { ...user, title: 'Detail User' });
    } else {
      res.sendStatus(404);
    }
  },

  form_add: (req, res) => {
    res.render('users/form_add', { title: 'Halaman Tambah User' });
  },

  add: (req, res) => {
    const { nama, email } = req.body;
    userModel.insertOneUser(nama, email);
    res.redirect('/users');
  },

  update: (req, res) => {
    const id = req.params.userId;
    const users = getUsers();
    const usersId = users.map((user) => user.id);
    if (!usersId.includes(parseInt(id))) {
      res.sendStatus(404);
    } else {
      users.filter((user) => {
        if (user.id == id) {
          user.name = req.body.name;
          user.email = req.body.email;
          return user;
        }
      });

      writeFileSync(file, JSON.stringify(users));
      res.json(users);
    }
  },

  delete: (req, res) => {
    const id = req.params.uid;
    let users = getUsers();
    const usersId = users.map((user) => user.id);
    if (!usersId.includes(parseInt(id))) {
      res.sendStatus(404);
    } else {
      users = users.filter((user) => user.id != id);
      console.log(users);

      writeFileSync(file, JSON.stringify(users));
      res.json(users);
    }
  },
};
