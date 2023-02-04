const { readFileSync, writeFileSync } = require('fs');

const file = './data/users.json';

module.exports = {
  index: (req, res) => {
    const users = JSON.parse(readFileSync(file, 'utf-8'));
    if (users.length > 0) {
      res.json({
        status: true,
        data: users,
        method: req.method,
        url: req.url,
      });
    } else {
      res.json({
        status: false,
        message: 'User not found',
      });
    }
  },
  add: (req, res) => {
    const users = JSON.parse(readFileSync(file, 'utf-8'));
    const userLastId = users[users.length - 1].id;
    users.push({ id: userLastId + 1, ...req.body });
    res.json({
      status: true,
      data: users,
      message: 'A new user has been added',
      method: req.method,
      url: req.url,
    });
    writeFileSync(file, JSON.stringify(users));
  },
  update: (req, res) => {
    const id = req.params.userId;
    const users = JSON.parse(readFileSync(file, 'utf-8'));
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
    let users = JSON.parse(readFileSync(file, 'utf-8'));
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
