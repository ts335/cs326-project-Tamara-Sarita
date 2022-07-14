import mongoose from 'mongoose';
const { Schema } = mongoose;

const registerSchema = new Schema({
  firstName:  String, 
  lastName: String,
  userName:   String,
  password: String,
});

const Users = mongoose.model('Users', registerSchema); //creating model for schema

export default Users;