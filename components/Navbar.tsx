"use client"
import Image from "next/image"
import Link from "next/link";
import { useAppContext } from "../context/appContext";
import { useRouter } from "next/navigation";
export default function Navbar() {

    const { serverIp, setIsLogin } = useAppContext();
    const router = useRouter();

    const handleLogout = async () => {
        const response = await fetch(`${serverIp}/api/auth/logout`, { method: "post", credentials: 'include' });

        if (response.status === 200) {
            setIsLogin(false);
            router.push('/login')
        }
    }
    return (
        <div className="w-full h-16 flex justify-between items-center bg-slate-400 sticky top-0 px-5 z-10">

            <div >
                <Image src={'/assets/logo_white_italic.png'} width={100} height={10} alt="" priority />
            </div>

            <div className="flex items-center justify-between w-2/5 ">
                <Link href={'/dashboard'}>Dashboard</Link>
                <Link href={'/contack'}>Contact</Link>

                <button className="px-2 py-1 bg-transparent border border-black" onClick={handleLogout}>Logout</button>
            </div>

        </div>
    )
}