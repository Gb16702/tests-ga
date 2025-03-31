import Button from "@/components/Button";
import { useState } from "react";
import useSessionStore from "@/store/useSessionStore";
import { useNavigate } from "react-router";

export default function Header() {
    const [loading, setLoading] = useState<boolean>(false);
    
    const { clearSession } = useSessionStore();

    const navigate = useNavigate();
    
    const handleClick = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/signout`, {
                method: "POST",
                credentials: "include"
            })

            if(!response.ok) {
                return;
            }

            clearSession();

            navigate("authentication/signin");

        } catch(error) {
            console.error("Error signing out: ", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={"h-[60px] bg-button-main w-full flex items-center justify-center"}>
            <Button type={"submit"} className={""} disabled={loading} onClick={handleClick}>
                <span className={"text-white"}>Sign out</span>
            </Button>
        </div>
    )
}