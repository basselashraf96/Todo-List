import { User } from "@lib/util/types";
import { query } from "./db";
import { UserData } from "@app/api/auth/register/route";
import bcrypt from "bcryptjs";
import { UserModel } from "./postgres/models/user";
import { dbConn } from "./postgres/objectionDbConnection";
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
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *`,
      [user.id, user.name, user.email, user.username, user.password, Date.now()]
    );
    return result.rows[0] as User;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const dbFindUser = async (
  username: string,
  password: string
): Promise<User | null> => {
  try {
    const result = await query(`SELECT * FROM "user" WHERE username = $1`, [
      username,
    ]);

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

/******************** Objection ******************************/

export const dbCreateUserByObjection = async (
  user: UserData
): Promise<UserModel> => {
  try {
    dbConn();
    const newUser = await UserModel.query().insert({
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      password_hash: user.password,
      created_at: Date.now(),
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const dbFindUserWithObjection = async (
  username: string,
  password: string
): Promise<UserModel | null> => {
  try {
    dbConn();

    const user = await UserModel.query().findOne({ username });

    if (!user) {
      return null; // No user found with that username
    }

    // Compare the provided password with the stored password hash
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return null; // Password doesn't match
    }

    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};
