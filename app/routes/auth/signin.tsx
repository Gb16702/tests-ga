import SignInForm from "@/components/forms/SignInForm";
import { Link } from "react-router";

export default function Signin() {
    return (
        <div className={"w-full h-full flex items-center justify-center rounded-3xl overflow-hidden bg-white"}>
            <div className={"w-[55%] h-full p-3"}>
                <div className={"bg-button-main w-full h-full rounded-2xl"}>

                </div>
            </div>
            <div className={"w-[45%] h-[75%] px-20"}>
                <h1 className={"text-4xl font-semibold"}>Welcome back</h1>
                <h2 className={"text-lg mt-1 text-subtitle-color"}>Please enter your details to sign in or <Link to={{ pathname: "/authentication/signup" }} className={"underline text-black"}>sign up</Link></h2>
                <SignInForm />
            </div>
        </div>
    )
}
