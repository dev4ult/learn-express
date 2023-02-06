const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: String,
    nama: String,
    email: String,
  },
  { timestamps: true }
);

const User = mongoose.model('users', userSchema, 'users');

module.exports = User;

// module.exports = {
//   insertOneUser: async (nama, email) => {
//     try {
//       const user = new User({
//         id: uuidv4(),
//         nama,
//         email,
//       });
//       await user.save();
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   deleteOneUser: (id) => {},
//   updateOneUser: (id, nama, email) => {},

//   fetchAllUser: () => {
//     return User.find({});
//   },

//   fetchOneUser: (id, callback) => {
//     User.findById(id, (err, user) => {
//       if (err) callback(err);
//       callback('null', user);
//     });

//     // try {
//     //   const user = await User.findById(id).exec();
//     //   return user;
//     // } catch (err) {
//     //   return err;
//     // }
//   },
// };
