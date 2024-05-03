import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./router";
import helmet from "helmet";
import cors from "cors";
import mysql from "mysql2";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use("/api", router);

const port = process.env.PORT || 3333;

export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8mb4",
});

connection.connect(error => {
  if (error) {
    console.error('Error connecting to DB:', error);
    return process.exit(1);
  }

  console.log("DB connected");

  app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
  });
});
