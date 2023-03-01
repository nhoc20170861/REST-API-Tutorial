import { Document, Schema, model } from 'mongoose';

import bcrypt from 'bcryptjs';
import config from 'config';

var current = new Date();
const timeStamp = new Date(
    Date.UTC(
        current.getFullYear(),
        current.getMonth(),
        current.getDate(),
        current.getHours(),
        current.getMinutes(),
        current.getSeconds(),
        current.getMilliseconds(),
    ),
);
console.log(timeStamp);
// Define the shape of the user document in MongoDB using the `Document` interface.
export interface userInput {
    email: string;
    username: string;
    password: string;
}

export interface userDocument extends userInput, Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

// Define the schema for the user collection.
const userSchema = new Schema<userDocument>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: timeStamp },
        updatedAt: { type: Date, default: timeStamp },
    },
    // Enable timestamps on the schema. This will automatically add `createdAt` and `updatedAt` fields to the documents.
    { timestamps: true },
);

userSchema.pre('save', async function (next) {
    let user = this as userDocument;
    console.log(user.isModified('password'));

    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as userDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e: Error) => false);
};

// Create a model for the user collection using the schema.
const userModel = model<userDocument>('User', userSchema);

// Export the user model as the default export of this module.
export default userModel;
