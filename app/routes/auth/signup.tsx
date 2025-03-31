import SignUpForm from "@/components/forms/SignUpForm";
import { Link } from "react-router";

export default function SignUp() {
    return (
        <div className={"w-full h-full flex items-center justify-center rounded-3xl overflow-hidden bg-white"}>
            <div className={"w-[55%] h-full p-3"}>
                <div className={"bg-button-main w-full h-full rounded-2xl"}>

                </div>
            </div>
            <div className={"w-[45%] h-[75%] px-20"}>
                <h1 className={"text-4xl font-semibold"}>Get started now</h1>
                <h2 className={"text-lg mt-1 text-subtitle-color"}>Create an account to start using our services or <Link to={{ pathname: "/authentication/signin" }} className={"underline text-black"}>sign in</Link></h2>
                <SignUpForm />
                <h3 className={"text-sm mt-8 text-secondary-color"}>
                    By creating an account, you agree to our <span className={"underline text-black"}>Terms of Service</span>
                </h3>
            </div>
        </div>
    )
}
