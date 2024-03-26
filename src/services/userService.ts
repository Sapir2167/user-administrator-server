import { ClientUser, CreateUserRequest } from "../models/userModel";
import connection from "../db/mysqlConfig";
import { hashPassword } from "../db/hashUtil";

export const getUsers = async (): Promise<ClientUser[]> => {
  return new Promise((resolve, reject) => {
    const query = "SELECT id, firstName, lastName, email FROM users";
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error fetcing users:", error);
        reject(error);
        return;
      }
      const users: ClientUser[] = results;
      resolve(users);
    });
  });
};

export const getUserByField = async (field: string, value: any): Promise<ClientUser> => {
  return new Promise((resolve, reject) => {
    const query = `SELECT id, firstName, lastName, email FROM users WHERE ${field} = ?`;
    connection.query(query, [value], (error, results) => {
      if (error) {
        console.error("Error getting user:", error);
        reject(error);
        return;
      }

      resolve(results.length > 0 ? results[0] : null);
    });
  });
};

export const createNewUser = async (user: CreateUserRequest): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    const hashedPassword = await hashPassword(user.password);

    const query = "INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)";
    const values = [user.firstName, user.lastName, user.email, hashedPassword];
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error("Error creating user:", error);
        reject(error);
        return;
      }
      resolve(results.insertId);
    });
  });
};

export const deleteUser = async (userId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM users WHERE id = ?";
    connection.query(query, [userId], (error, results) => {
      if (error) {
        console.error("Error deleting user:", error);
        reject(error);
        return;
      }
      resolve();
    });
  });
};
