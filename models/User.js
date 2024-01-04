import mongoose from "mongoose";
import bcrypt from "bcrypt";


import generateId from '../helper/generateId.js';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: null,
        trim: true,
    },
    address: {
        type: String,
        default: null,
        trim: true,
    },
    web: {
        type: String,
        default: null,
        trim: true,
    },
    token: {
        type: String,
        default: generateId(),
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: null,
        trim: true,
    }
});

// Before saving the user, hash the password
// https://www.npmjs.com/package/bcryptjs
// https://www.npmjs.com/package/bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    };
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Confirm user password, this function returns true or false
userSchema.methods.checkPassword = async function (passwordFromForm) {
    return await bcrypt.compare(passwordFromForm, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;