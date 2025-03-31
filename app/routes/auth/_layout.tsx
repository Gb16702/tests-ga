import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/_layout";

export async function loader({ request }: Route.LoaderArgs) {
    const cookies = request.headers.get("cookie") ?? "";
    const authCookie = cookies.split(";").find(cookie => cookie.trim().startsWith("auth="))

    const isAuthenticated = !!authCookie;

    if(isAuthenticated) {
        return redirect("/")
    }
}

export default function AuthLayout() {
    return (
        <div className="w-full h-dvh p-12">
            <Outlet />
        </div>
    );
}
