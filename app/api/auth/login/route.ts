import { NextResponse } from "next/server";
import { dbFindUser } from "@lib/db/users";
import { JwtPayload, User } from "@lib/util/types";
import jwt from "jsonwebtoken";

/**
 * POST /api/login
 *
 * Authenticates a user by verifying the username and password, then generates a JWT.
 *
 * @param {Request} request - The incoming request object, containing the username and password in JSON format.
 * @returns {Promise<NextResponse>} - JSON response containing the authenticated user or an error message.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const { username, password }: { username: string; password: string } = await request.json();

  try {
    const user: User | null = await dbFindUser(username, password);

    if (!user) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user.id, username: user.username } as JwtPayload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return NextResponse.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "Error during login", error }, { status: 500 });
  }
}
