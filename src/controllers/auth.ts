import { NextFunction, Request, Response } from "express";
import { IUser } from "../../types/user";
import UserModel from "../models/user";
import AppError from "../AppError";
import { Keypair } from "@solana/web3.js";
import { responseData } from "../../types/response";
import bs58 from "bs58";

export async function signIn(
  req: Request,
  res: Response<responseData>,
  next: NextFunction
) {
  const { password, username } = req.body;

  const user: IUser | null = await UserModel.findOne({ password, username });

  if (!user) throw new AppError("Unable to login", "INVALID_USER", 400);

  req.body.userInfo = { username: user.username, publicKey: user.publicKey };

  res.status(201).json({
    status: "success",
    error: null,
    data: {
      code: "USER_LOGEDIN",
      userPublicKey: user.publicKey,
      username: user.username,
    },
  });
}

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  const isRegistered = await UserModel.findOne({ username });

  if (isRegistered)
    throw new AppError("User already exists", "INVALID_REQUEST", 401);

  const keyPair = Keypair.generate();

  const user = await UserModel.create({
    username,
    password,
    publicKey: keyPair.publicKey,
    privateKey: bs58.encode(keyPair.secretKey),
  });

  if (!user) throw new AppError("Unable to create user", "INTERNAL_ERROR", 500);

  res.status(200).json({
    status: "success",
    error: null,
    data: { code: "USER_REGISTERED" },
  });
}

export async function listUsers(req: Request, res: Response) {
  const users = await UserModel.find({});

  res.status(201).json({
    status: "sucess",
    error: null,
    data: { users },
  });
}
