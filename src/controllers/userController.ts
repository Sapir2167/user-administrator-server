import { Request, Response } from "express";

import { createNewUser, getUsers, deleteUser, getUserByField } from "./../services/userService";
import { executeWithRetry } from "../db/retryUtil";
import { CreateUserRequest } from "../models/userModel";

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    await executeWithRetry(async () => {
      const users = await getUsers();
      res.status(200).json(users);
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createUser = async (req: Request<{}, {}, CreateUserRequest>, res: Response): Promise<any> => {
  try {
    const userData = req.body;

    // Validate input data
    if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    if (!validateEmail(userData.email)) {
      res.status(400).json({ error: "Invalid email format" });
      return;
    }

    await executeWithRetry(async () => {
      let isUserExist = await getUserByField("email", userData.email);

      if (isUserExist) {
        res.status(400).json({ error: "User with the same email already exist" });
      } else {
        const createdUserId = await createNewUser(userData);
        let { password, ...CreatedUser } = Object.assign({}, userData);

        res.status(201).json({ ...CreatedUser, id: createdUserId });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
    }

    await executeWithRetry(async () => {
      let isUserExist = await getUserByField("id", userId);

      if (!isUserExist) {
        res.status(400).json({ error: "User ID does not exist" });
      }

      await deleteUser(Number(userId));
      res.status(204).json({ message: "User deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
