// const { readFileSync, writeFileSync } = require('fs');
const userModel = require('../models/user_m');
const { v4: uuidv4 } = require('uuid');

const file = './data/users.json';

module.exports = {
  index: (req, res) => {
    userModel.find((err, users) => {
      if (err) console.log(err);
      res.render('users/index', { users, title: 'List User' });
    });
  },

  detail: (req, res) => {
    const paramsId = req.params.id;
    userModel.findById(paramsId, (err, user) => {
      if (err) console.log('Something went wrong');
      const { _id, nama, email } = user;
      res.render('users/detail', { _id, nama, email, title: 'Detail User' });
    });
  },

  form_add: (req, res) => {
    res.render('users/form_add', { title: 'Halaman Tambah User' });
  },

  add: (req, res) => {
    const { nama, email } = req.body;
    userModel.create({
      id: uuidv4,
      nama,
      email,
    });
    res.redirect('/users');
  },

  update: (req, res) => {
    const paramsId = req.body.id;

    const { nama, email } = req.body;
    userModel.findByIdAndUpdate(paramsId, { nama, email }, (err, result) => {
      if (err) console.log(err);

      console.log(result);
    });

    res.redirect('/users/detail/' + paramsId);
  },

  delete: (req, res) => {
    const id = req.body.id;
    userModel.findByIdAndDelete(id).then((err, result) => {
      if (err) console.log(err);

      console.log(result);
    });
    res.redirect('/users');
  },
};
