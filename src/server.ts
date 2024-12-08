import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";


import errorHandler from "./middleware/errorHandler";
import "./db";
import authRouter from "./routers/authRouter";
import txnRouter from "./routers/txnRouter";

const app = express();
app.use(
    cors({
      credentials: true,
    })
  );
  
  app.use(bodyParser.json());
  app.use(compression());
  app.use(express.urlencoded({ extended: true }));

  app.use(authRouter); 
  app.use(txnRouter);


app.post("/api/v1/txn", (req, res)=>{
    res.json({
        message: "txn"
    })
})
app.use(errorHandler);

app.listen(5000, ()=>{console.log("Server is up and running...")})