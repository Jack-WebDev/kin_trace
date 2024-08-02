import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (request: Request) => {
  cookies().delete("authToken");
  return new NextResponse(JSON.stringify({ message: "Logout successfully" }));
};
