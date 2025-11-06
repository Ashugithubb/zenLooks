import { cookies } from "next/headers";

export  default async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  console.log(token?.value,"dghsgfdhsgfdha"); // Works here
  // if (!token) {
  //   console.log("Token missing → Clearing localStorage");
  //   localStorage.clear();
  //   dispatch(clearUser());

  // }
}

