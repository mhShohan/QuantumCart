import { Schema, model } from 'mongoose'
import { TAddress, TFullName, TUser } from './user.interface'

const fullNameSchema = new Schema<TFullName>({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
})

const addressSchema = new Schema<TAddress>({
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
})

const userSchema = new Schema<TUser>({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: fullNameSchema, required: true },
    age: {
        type: Number,
        required: true,
        validate: {
            validator: function (value: number): boolean {
                return value >= 0
            },
            message: 'Age must be greater or equal then 0!',
        },
    },
    email: { type: String, required: true, unique: true, lowercase: true },
    isActive: { type: Boolean, required: true },
    hobbies: [{ type: String }],
    address: { type: addressSchema, required: true }
}, { timestamps: true })


const User = model('user', userSchema)

export default User