// 'use client'
import Navbar from "../../../components/Navbar";
import { cookies } from "next/headers";
import { User } from "../../../utility/user";
import dateTimeFormat from "../../../lib/dateTimeFormat";
import Image from "next/image";
import Link from "next/link";



async function getData() {
  const cookie = cookies();
  const res = await fetch('http://192.168.50.14:3000/api/auth/getuser', { method: 'GET', headers: { 'auth-token': String(cookie.get('authtoken')?.value) } })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.error('Failed to fetch data')
  }

  return res.json()
}

export default async function UserPage() {




  const data: User = await getData();

  return <div className="w-full flex flex-col items-center">
    <Navbar />
    <div className="w-96 h-96 flex flex-col items-center mt-20 border border-black relative px-2">
      <Image src="/assets/person.jpg" className="rounded-full absolute top-[-40px] " width={80} height={80} alt="" priority />

      <div className="w-full mt-[90px]">
        <p><strong>Brand Name</strong> : {data?.user?.name}</p>
        <p><strong>Email:</strong> {data?.user?.email}</p>
        <p><strong>Address:</strong> {data?.user?.address}</p>
        <p><strong>Created At:</strong> {dateTimeFormat(data?.user?.date)}</p>
      </div>

      <Link href="/user/edit" className="mt-10 border border-black px-2 py-1">Edit profile</Link>
      <Link href="#" className="mt-10 border border-black px-2 py-1">Change Password</Link>
    </div>
  </div>
}
