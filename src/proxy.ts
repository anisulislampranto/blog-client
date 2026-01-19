import { NextRequest, NextResponse } from "next/server"
import { userService } from "./services/user.service";
import { roles } from "./constants/roles";

export const proxy = async(request: NextRequest) => {
    let isAuthenticated = false;
    let isAdmin = false;

    const {data} = await userService.getSession();

    if (data) {
        isAuthenticated = true;
        isAdmin = data?.user?.role === roles.admin
    }

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard"]
}