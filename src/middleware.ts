import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const res = NextResponse.next();
  return res;
}
