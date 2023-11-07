import Mongoose from 'mongoose';
import { useVirtualId} from '../database/database.js';

const userSchema = new Mongoose.Schema({
  username: { type:String, required: true},
  name: { type: String, required: true},
  email: { type:String, required: true},
  password: { type:String, required: true},
  url: String,
});


useVirtualId(userSchema);

const User = Mongoose.model('User', userSchema);


export async function findByUsername(username) {

  return User.findOne({ username});

  // return getUsers()
  // .findOne({ username })
  // .then((data)=>{
  //  return mapOptionalUser(data);
  //});
}

export async function findById(id) {

  return User.findById(id);

  // return getUsers()
  // .findOne({_id: new ObjectID(id)})
  // .then((data)=>{
  //   return mapOptionalUser(data);
  // });

}


export async function createUser(user) {

return new User(user).save().then((data)=>data.id);

  // return getUsers()
  //   .insertOne(user)
  //   .then((data)=>{
  //     return data.insertedId.toString();
  //   });
  } 

// function mapOptionalUser(user) {
//   return user ? { ...user, id: user._id.toString() } : user;
// }
