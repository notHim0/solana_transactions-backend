import mongoose, { Document, Schema } from "mongoose";

import {IUser} from "../../types/user";

const userSchema = new Schema<IUser>({
    username: String,
    password: String,
    privateKey: String,
    publicKey: String,

}) 

const UserModel = mongoose.model<IUser>("users", userSchema);

export default UserModel