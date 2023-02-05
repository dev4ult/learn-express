const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const userSchema = new Schema(
  {
    id: String,
    nama: String,
    email: String,
  },
  { timestamps: true }
);

const Users = mongoose.model('users', userSchema);

module.exports = {
  insertOneUser: async (nama, email) => {
    try {
      const user = new Users({
        id: uuidv4(),
        nama,
        email,
      });
      await user.save();
    } catch (err) {
      console.log(err);
    }
  },
  deleteOneUser: (id) => {},
  updateOneUser: (id, nama, email) => {},
  readAllUser: () => {
    return Users.find({});
  },
};
