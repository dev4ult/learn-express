const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'nodejs';

const client = new MongoClient(uri);

const db = client.db(dbName);
const users = db.collection('users');

// there is so many query / command you can learn more in here : https://www.mongodb.com/docs/drivers/node/upcoming/usage-examples/

// but for an example, i provide some of the basic query / command of mongodb manipulating the collection data below

async function insertManyUser() {
  try {
    const doc = [
      { id: 9, nama: 'no9', email: 'no9@example.com' },
      { id: 10, nama: 'no10', email: 'no10@example.com' },
    ];

    const result = await users.insertMany(doc);
    console.log(result);
  } finally {
    await client.close();
  }
}

async function deleteOneUser() {
  try {
    const query = { id: 8 };

    const result = await users.deleteOne(query);
    console.log(result);
  } finally {
    await client.close();
  }
}

async function deleteManyUser() {
  try {
    const query = { nama: 'no9' };

    const result = await users.deleteMany(query);
    console.log(result);
  } finally {
    await client.close();
  }
}

async function readAllUser() {
  try {
    const result = users.find();
    const data = await result.toArray();
    console.log(data);
  } finally {
    await client.close();
  }
}

async function readOneUser() {
  try {
    const filter = { id: 7 };
    const result = await users.findOne(filter);
    console.log(result);
  } finally {
    await client.close();
  }
}

async function updateOneUser() {
  try {
    const filter = { id: 7 };

    const setDoc = {
      $set: {
        nama: 'Nama setelah diupdate',
      },
    };

    const result = await users.updateOne(filter, setDoc);
    console.log(result);
  } finally {
    await client.close();
  }
}

async function updateManyUser() {
  try {
    const filter = { id: 10 };

    const setDoc = {
      $set: {
        email: 'example@example.com',
      },
    };

    const result = await users.updateMany(filter, setDoc);
    console.log(result);
  } finally {
    await client.close();
  }
}

// readOneUser().catch((err) => console.log(err));
readAllUser().catch((err) => console.log(err));
// deleteOneUser().catch((err) => console.log(err));
// deleteManyUser().catch((err) => console.log(err));
// insertManyUser().catch((err) => console.log(err));
// updateOneUser().catch((err) => console.log(err));
// updateManyUser().catch((err) => console.log(err));

// deprecated
// client.connect((err, client) => {
//   if (err) return console.log('Connection terminated');

//   console.log('Connection is good to go');

//   const db = client.db(dbName);

//   db.collection('users').insertOne(
//     {
//       id: 7,
//       nama: 'Erik',
//       email: 'erik@example.com',
//     },
//     (err, result) => {
//       if (err) return console.log('Failed to insert new users');

//       console.log(result);
//     }
//   );
// });
