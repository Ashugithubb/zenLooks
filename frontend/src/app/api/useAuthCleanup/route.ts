// import { cookies } from "next/headers";

// export  default async function GET() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("access_token");
//   console.log(token?.value,"dghsgfdhsgfdha"); // Works here
//   // if (!token) {
//   //   console.log("Token missing → Clearing localStorage");
//   //   localStorage.clear();
//   //   dispatch(clearUser());

//   // }
// }

import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token");
  return Response.json({ token: token?.value || null });
}