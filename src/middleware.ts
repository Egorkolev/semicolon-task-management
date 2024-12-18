import { NextRequest, NextResponse } from "next/server";
import { importSPKI, jwtVerify } from "jose";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { apiKeys } from "./lib/apiKeys";

const privateKey = apiKeys.RSA_PUBLIC_KEY_PEM.replace(/\\n/g, "\n");

async function getPublicKey() {
  return await importSPKI(privateKey, "RS256");
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // exclude Login / register endpoind
  if (
    url.pathname.startsWith("/api/logIn") ||
    url.pathname.startsWith("/api/register")
  ) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    try {
      const publicKey = await getPublicKey();
      const { payload } = await jwtVerify(token, publicKey);

      // add user description
      const response = NextResponse.next();
      response.headers.set("tm-user-id", payload.userId as string);
      return response;
    } catch (error) {
      console.error("Token verification failed", error);

      // return 401 if Token not Valid
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  // If we don`t have Token then continue
  return createMiddleware(routing)(req);
}

export const config = {
  matcher: [
    "/",
    "/(en|fr|uk|de|es|ru)/:path*",
    "/((?!/api|_next|favicon.ico).*)",
  ],
};