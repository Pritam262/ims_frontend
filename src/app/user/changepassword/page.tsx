'use client'

import { useState } from "react";
import { useAppContext } from "../../../../context/appContext";


export default function ChangePasswordPage() {

    const { serverIp } = useAppContext();

    const [isChecked, setIsChecked] = useState(false);

    const [data, setData] = useState({ password: '', newPass: '', conPass: '' });

    const [error, setError] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    const handleChnagePassword = async () => {

        try {

            const response = await fetch(`${serverIp}/api/auth/changepassword`, { credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });


            const resData = await response.json();
            if (!response.ok) {
                setError(resData.error)
            }

            console.log(resData)

        } catch (error) {
            console.error('Faild to fetch')
        }



    }

    return <div className="container  h-[550px] bg-slate-200 sm:w-56 md:w-2/4 xl:w-[450px] flex flex-col  px-4 rounded-lg mx-auto mt-20">

        <h3 className="my-5 text-xl text-center">Change password</h3>
        <div className="w-full flex items-center justify-between mb-2">
            {/* <label htmlFor="password">Old password</label> */}
            <input type={isChecked ? 'text' : 'password'} className="p-2 w-full text-black" name="password" placeholder="Old password" onChange={handleInputChange} value={data?.password} />
        </div>

        <div className="w-full flex items-center justify-between mb-2">
            {/* <label htmlFor="newPass">New password</label> */}
            <input type={isChecked ? 'text' : 'password'} className="p-2 w-full text-black" name="newPass" placeholder="New password" onChange={handleInputChange} value={data?.newPass} />
        </div>

        <div className="w-full flex items-center justify-between mb-2">
            {/* <label htmlFor="conPass">Confirm password</label> */}
            <input type={isChecked ? 'text' : 'password'} className="p-2 w-full text-black" name="conPass" placeholder="Confirm password" onChange={handleInputChange} value={data?.conPass} />
        </div>
        <div className="flex items-center" >
            <div className="cursor-pointer flex items-center justify-center w-4 h-4 border border-black rounded-sm hover:border-purple-600 duration-700" onClick={() => setIsChecked((prev) => !prev)}>
                {isChecked && <svg id="eGHmwTEUjQx1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><path d="M3.442792,11.182478C6.083623,11.68725,8.607643,15.369444,8.92308,17.5c2.017493-4.151157,7.328382-8.748402,12.029969-9.831635" transform="matrix(1.022924 0 0 1.028659-.477546-.944832)" paint-order="markers fill stroke" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" /></svg>}
            </div>
            <span className="ml-5">Show password</span>
        </div>

        <button className="w-fit border border-black px-2 py-1 mt-5  shadow-black shadow-sm" onClick={() => handleChnagePassword}>Submit</button>
        <div className="w-full h-6  mt-8">
            {error && <p className="text-red-600">{error}</p>}
        </div>




    </div>
}

