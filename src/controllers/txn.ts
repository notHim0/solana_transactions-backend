import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { Request, Response } from "express";
import bs58 from "bs58";
import { IUser } from "../../types/user";
import UserModel from "../models/user";
import AppError from "../AppError";

export async function signTransaction(req: Request, res: Response) {
  const connection = new Connection(
    "https://solana-mainnet.g.alchemy.com/v2/dKOvxYzGNrvI1oE1UuEfVbdmGy4F5Cqs"
  );
  const { serializedTxn, userInfo } = req.body;

  const user: IUser | null = await UserModel.findOne({
    username: userInfo.username,
    publicKey: userInfo.userPublicKey,
  });
  if (!user) throw new AppError("transaction aborted!", "INAVLID_USER", 400);

  const tx: Transaction = Transaction.from(
    Buffer.from(serializedTxn, "base64")
  );

  const userKeyPair: Keypair = Keypair.fromSecretKey(
    bs58.decode(user.privateKey)
  );

  const { blockhash } = await connection.getLatestBlockhash();

  tx.recentBlockhash = blockhash;
  tx.feePayer = new PublicKey(user.publicKey);

  tx.sign(userKeyPair);

  console.log(tx);

  const signature = await connection.sendTransaction(tx, [userKeyPair]);

  res.json({
    status: "success",
  });
}
