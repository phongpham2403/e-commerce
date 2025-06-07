import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {
	if (request.method === "GET") {
		return NextResponse.next();
	}
	const originHeader = request.headers.get("Origin");
	// NOTE: You may need to use `X-Forwarded-Host` instead
	const hostHeader = request.headers.get("Host");
	if (originHeader === null || hostHeader === null) {
		return new NextResponse(null, {
			status: 403
		});
	}
	let origin: URL;
	try {
		origin = new URL(originHeader);
	} catch {
		return new NextResponse(null, {
			status: 403
		});
	}
	if (origin.host !== hostHeader) {
		return new NextResponse(null, {
			status: 403
		});
	}
	return NextResponse.next();
}


// Cookies
export async function setSessionTokenCookie(token: string, expiresAt: Date): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.set("session", token, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		expires: expiresAt,
		path: "/"
	});
}

export async function deleteSessionTokenCookie(): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.set("session", "", {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		maxAge: 0,
		path: "/"
	});
}