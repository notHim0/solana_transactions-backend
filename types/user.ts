export interface IUser extends Document{
    username: string;
    password: string;
    privateKey: string;
    publicKey: string;
}