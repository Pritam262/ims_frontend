'use client'
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../context/appContext"
import { User } from "../../../../utility/user";
import Navbar from "../../../../components/Navbar";
import dateTimeFormat from "../../../../lib/dateTimeFormat";
import Image from "next/image";
export default function UserEditPage() {

    const { serverIp } = useAppContext();

    const [userData, setUserData] = useState<User>();

    const handleInputChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setUserData({...userData,user:{...userData?.user,[e.target.name]:e.target.value}})
        setUserData({
            ...userData,
            //@ts-ignore
            user: {
                ...userData?.user,
                [e.target.name]: e.target.value
            }
        });
    }
    const getuser = async () => {
        try {
            const response = await fetch(`${serverIp}/api/auth/getuser`, { credentials: 'include', headers: { 'content-Type': 'application/json' } });

            setUserData(await response.json());
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getuser();
    }, [])
    return <div className="w-full flex flex-col items-center">
        <Navbar />
        <div className="w-96 h-96 flex flex-col items-center mt-20 border border-black relative px-2">
            <Image src="/assets/person.jpg" className="rounded-full absolute top-[-40px] " width={80} height={80} alt="" priority />

            {userData && <div className="w-full mt-[90px]">
                <p><strong>Brand Name</strong> : <input  className="border-b border-black" type="text" name="name" value={userData?.user?.name} onChange={handleInputChnage} /></p>
                <p><strong>Email:</strong> {userData?.user?.email}</p>
                <p><strong>Address:</strong> <input className="border-b border-black" type="email" name="email"  value={userData?.user?.address} onChange={handleInputChnage}/></p>
                <p><strong>Created At:</strong> {dateTimeFormat(userData?.user?.date)}</p>
            </div>}

            <button className="mt-10 border border-black px-2 py-1">Edit profile</button>
        </div>
    </div>
}