import { Outlet } from "react-router";
import Header from "@/components/Header";

export default function mainLayout() {
    return (
        <div className={"w-full h-dvh"}>
            <Header />
            <Outlet />
        </div>
    )
}