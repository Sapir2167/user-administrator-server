import express from "express";
import cors from "cors";

import userRouter from "./routes/userRoutes";
import connection from "./db/mysqlConfig";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to mySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`User Administretaor Client is running on port ${port}`);
});
