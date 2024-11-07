import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionAuth = await getSession();
  const user = sessionAuth?.user || null;

  const isAuthenticated = !!user;

  return NextResponse.json({
    authenticated: isAuthenticated,
  });
}
