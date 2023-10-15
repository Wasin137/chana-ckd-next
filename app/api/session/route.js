import { getServerSession } from "next-auth";
import { authOptions } from "@/app/src/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
    const session = await getServerSession(authOptions);

    return NextResponse.json({
        authenticated: !!session,
        session
    });
}