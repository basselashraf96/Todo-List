import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { UserInput } from "@lib/util/types";
import { dbCreateUser } from "@lib/db/users";

export interface UserData {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
}
/**
 * POST /api/users
 *
 * Registers a new user in the database.
 * Generates a unique UUID for the 'id' field and hashes the password before storing it.
 *
 * @param {Request} request - The incoming request object, containing the user's registration details in JSON format.
 * @returns {Promise<NextResponse>} - JSON response containing the new user data or an error message.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const { name, email, username, password, confirmPassword }: UserInput = await request.json();

  // Validate if passwords match for security
  if (password !== confirmPassword) {
    return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password with 10 rounds

    const newUser: UserData = {
      id: uuidv4(),
      name,
      email,
      username,
      password: hashedPassword,
    };

    const createdUser = await dbCreateUser(newUser);

    return NextResponse.json(createdUser);
  } catch (error) {
    return NextResponse.json({ message: "Error creating user", error }, { status: 500 });
  }
}
