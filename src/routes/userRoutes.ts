import express from "express";
import { getAllUsers, createUser, deleteUserById } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/users/", createUser);
userRouter.get("/users/", getAllUsers);
userRouter.delete("/users/:id", deleteUserById);

export default userRouter;
