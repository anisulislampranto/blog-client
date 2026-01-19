import { NextRequest, NextResponse } from "next/server"

export const proxy = async(request: NextRequest) => {
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard"]
}