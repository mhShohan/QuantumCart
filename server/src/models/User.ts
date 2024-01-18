import { Schema, model } from "mongoose";
import validator from "validator";

interface IUser extends Document {
  _id: string
  name: string
  email: string
  photo: string
  role: 'admin' | 'user'
  gender: 'male' | 'female'
  dob: Date
  createdAt: Date
  updatedAt: Date
  age: number
}

const userSchema = new Schema({
  _id: { type: String, required: [true, '_id is required!'] },
  name: { type: String, required: [true, 'name is required!'] },
  email: {
    type: String,
    required: [true, 'email is required!'],
    unique: [true, 'Email already exist!'],
    validator: validator.default.isEmail
  },
  dob: { type: Date, required: [true, 'Date of birth is required!'] },
  photo: { type: String, required: [true, 'photo is required!'] },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  gender: { type: String, enum: ['male', 'female'], required: [true, 'Gender is required!'] }
}, { timestamps: true })


userSchema.virtual('age').get(function () {
  const today = new Date()
  const dob: Date = this.dob
  let age = today.getFullYear() - dob.getFullYear()

  if (today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() &&
      today.getDate() < dob.getDate())
  ) {
    age--
  }

  return age
})

const User = model<IUser>('user', userSchema)

export default User