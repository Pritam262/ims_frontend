
'use client'

import { useState } from "react";
import { useAppContext } from "../../../context/appContext";
import { useRouter } from "next/navigation";
export default function LoginPage() {

    const router = useRouter();
    const [isChecked, setIsChecked] = useState(false);

    const { serverIp } = useAppContext();

    const [credenctials, setCredencials] = useState({ email: '', password: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredencials({ ...credenctials, [e.target.name]: e.target.value })
    }

    const handleLogin = async () => {
        try {

            const response = await fetch(`${serverIp}/api/auth/login`, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credenctials),
            });

            if (response.status === 200) {
                router.push('/');
            }


        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <div className="container  h-[550px] bg-slate-200 sm:w-56 md:w-2/4 xl:w-[450px] flex flex-col  px-4 rounded-lg">
                <h1 className="text-4xl mb-6 text-center mt-5">Login</h1>


                <div className="w-full flex items-center justify-between mb-2">
                    <label htmlFor="email">Email</label>
                    <input autoFocus type="email" name="email" className="px-2 py-2 w-4/5 text-black" onChange={handleInputChange} />
                </div>

                <div className="w-full flex items-center justify-between mb-2">
                    <label htmlFor="password">Password</label>
                    <input type={isChecked ? 'text' : 'password'} name="password"  className="p-2 w-4/5 text-black" onChange={handleInputChange} />
                </div>

                <div className="flex items-center" >
                    <div className="cursor-pointer flex items-center justify-center w-4 h-4 border border-black rounded-sm hover:border-purple-600 duration-700" onClick={() => setIsChecked((prev) => !prev)}>
                        {isChecked && <svg id="eGHmwTEUjQx1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><path d="M3.442792,11.182478C6.083623,11.68725,8.607643,15.369444,8.92308,17.5c2.017493-4.151157,7.328382-8.748402,12.029969-9.831635" transform="matrix(1.022924 0 0 1.028659-.477546-.944832)" paint-order="markers fill stroke" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" /></svg>}
                    </div>
                    <span className="ml-5">Show password</span>
                </div>

                <button className="px-3.5 py-2.5 bg-blue-500 mx-auto mt-5 rounded-md hover:bg-blue-600 hover:text-white duration-700 text-black" disabled={credenctials.password.length < 8} onClick={handleLogin}>Login</button>

            </div>

        </div>
    )
}