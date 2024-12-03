import { User } from "@lib/util/types";
import { query } from "./db";
import { UserData } from "@app/api/auth/register/route";
import bcrypt from "bcryptjs";
/**
 * Inserts a new user into the database.
 *
 * @param {User} user - The user object containing user details.
 * @returns {Promise<User>} - The newly created user from the database.
 */
export const dbCreateUser = async (user: UserData): Promise<User> => {
  try {
    const result = await query(
      `INSERT INTO "user" (id, name, email, username, password_hash, created_at) 
      VALUES ($1, $2, $3, $4, $5, NOW()) 
      RETURNING *`,
      [user.id, user.name, user.email, user.username, user.password]
    );
    return result.rows[0] as User;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const dbFindUser = async (username: string, password: string): Promise<User | null> => {
  try {
    const result = await query(`SELECT * FROM "user" WHERE username = $1`, [username]);

    if (result.rows.length === 0) {
      return null;
    }

    const user: User = result.rows[0] as User;

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};
