import { NextRequest, NextResponse } from "next/server";
import { encodeSecret, getJwtSecret } from "../util/jwt";
import { jwtVerify } from "jose";
import { authMiddlewareResponse } from "@lib/util/types";

export async function authMiddleware(request: NextRequest): Promise<NextResponse<authMiddlewareResponse> | NextResponse> {
  const token = request.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    const redirectUrl = new URL("/login", request.url);
    return NextResponse.redirect(redirectUrl.toString());
  }
  const res = getJwtSecret();

  if (!res.success) {
    return NextResponse.redirect(new URL("/login", request.url)); // go to error page
  }
  const jwtSecret = res.data as string;
  try {
    const { payload } = await jwtVerify(token, encodeSecret(jwtSecret));
    const { userId } = payload;

    return new NextResponse(JSON.stringify({ user: userId as string }));
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
