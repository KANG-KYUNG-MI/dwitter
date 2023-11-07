// import MongoDb from 'mongodb';
// import { config } from '../config.js';

// let db;
// export async function connectDB() {
//   return MongoDb.MongoClient.connect(config.db.host, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }) //
//   .then((client) => {
//     db = client.db();
//   });
// }

// zxcvbnmsdfghjksdfghjertyu


import Mongoose from 'mongoose';
import { config } from '../config.js';

export async function connectDB() {
  return Mongoose.connect(config.db.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

export function useVirtualId(schema) {
  schema.virtual('id').get(function () {
    return this._id.toString();
  });
  schema.set('toJSON', { virtuals: true });
  schema.set('toOject', { virtuals: true });
}

//todo(chloe): Delete

// export function getUsers() {
//   return db.collection('users');
// }

let db;
export function getTweets() {
  return db.collection('tweets');
}
