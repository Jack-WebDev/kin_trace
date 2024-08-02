"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

// Function to get the authentication token from cookies
export async function getAuthCookie() {
  const cookie = cookies().get("authToken");
  if (!cookie) {
    return null;
  }

  const token = cookie.value;
  if (!token) {
    return null;
  }

  return token;
}

// Function to decode the JWT token and return the user authentication information
export async function getAuth(cookie?: string) {
  const authCookie = cookie ? cookie : await getAuthCookie();
  if (!authCookie) {
    return null;
  }

  let data: AuthUserType | null = null;
  try {
    data = jwtDecode<AuthUserType>(authCookie);
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }

  if (!data) {
    return null;
  }

  return {
    ...data.payload,
    iat: data.iat,
    exp: data.exp,
  };
}

// Define the AuthUserType
export type AuthUserType = {
  payload: any;
  id: string;
  accessToken: string;
  refreshToken: string;
  status: string;
  role: string;
  iat: number;
  exp: number;
};
