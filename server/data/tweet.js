import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';
import * as UserRepository from './auth.js';

//import { getTweets } from '../database/database.js';
//const ObjectId = MongoDb.ObjectId;

const tweetSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    url: String,
  },
  { timestamps: true }
);

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);

export async function getAll() {
  return Tweet.find().sort({ createdAt: -1 });

  // return getTweets() //
  //   .find()
  //   .sort({ createdAt: -1 })
  //   .toArray()
  //   .then(data => mapTweets(data));
}

export async function getAllByUsername(username) {
  return Tweet.find({ username }).sort({ createdAt: -1 });

  // return getTweets() //
  // .find({username})
  // .sort({ createdAt: -1 })
  // .toArray()
  // .then(data => mapTweets(data));
}

export async function getById(id) {
  return Tweet.findById(id);

  // return getTweets()
  //   .findOne({ _id: new ObjectId(id) })
  //   .then ( data => mapOptionalTweet(data));
}

export async function create(text, userId) {
  return UserRepository.findById(userId).then((user) =>
    new Tweet({
      text,
      userId,
      name: user.name,
      username: user.username,
    }).save()
  );
  //const user = await UserRepository.findById(userId);
  // const { name, username, url } = await UserRepository.findById(userId);
  // const tweet = {
  //   createdAt: new Date(),
  //   text,

  //   userId,
  //   name,
  //   username,
  //   url,

  //   // name: user.name,
  //   // username: user.username,
  //   // url: user.url,
  // };

  // return getTweets()
  //   .insertOne(tweet) //
  //   .then((data) => {
  //     const newTweet = mapOptionalTweet({ ...tweet, _id: data.insertedId });
  //     console.log(newTweet);
  //     return newTweet;
  //   });
}

export async function update(id, text) {
  return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });

  // return getTweets()
  //   .findOneAndUpdate(
  //     { _id: new ObjectId(id) },
  //     { $set: { text } },
  //     { returnDocumnet: 'after' }
  //   )
  //   .then((result) => result.value)
  //   .then(mapOptionalTweet);
}

export async function remove(id) {

  return Tweet.findByIdAndRemove(id);
  // return getTweets().deleteOne({ _id: new ObjectId(id) });
}

// function mapOptionalTweet(tweet) {
//   return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
// }

// function mapTweets(tweets) {
//   return tweets.map((tweet) => mapOptionalTweet(tweet));

//   //return tweets.map(mapOptionalTweet);
// }
