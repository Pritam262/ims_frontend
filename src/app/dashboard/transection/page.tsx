'use client'
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../context/appContext"
import dateTimeFormat from "../../../../lib/dateTimeFormat";
import { FaRegEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
interface TransectionInterface {
    salesData: {
        id: string,
        user: string,
        transId: string,
        paymenttype: string,
        totalprice: string,
        date: string,
    }[]
}
export default function TransectionPage({ params, searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | string[] | undefined } }) {

    const { serverIp } = useAppContext();
    const [startDate, setStartDate] = useState<string>(`${searchParams?.startdate}`);
    const [endDate, setEndDate] = useState(`${searchParams?.enddate}`);
const router = useRouter();
    const [transectionData, setTransectionData] = useState<TransectionInterface>();

    const fetchTransectionData = async (startDate: string, endDate: string) => {
        const response = await fetch(`${serverIp}/api/transection?startDate=${startDate}&endDate=${endDate}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });

        setTransectionData(await response.json());

        // console.log(resData);
    }


    useEffect(() => {
        fetchTransectionData(startDate, endDate)
    }, [startDate, endDate])
    return (
        <div className="w-full">
                            <div className='w-fit flex items-center justify-between my-1'>

<label htmlFor="stdate" className='mr-4'>Start date</label>  <input type="date" name="stdate" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setStartDate(e.target.value); router.push(`/dashboard/transection?startdate=${e.target.value}&enddate=${endDate}`) }} defaultValue={startDate} className='border border-black text-black' />
<label htmlFor="endate" className='ml-4'>End date</label>
<input type="date" name="endate" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEndDate(e.target.value); router.push(`/dashboard/transection?startdate=${startDate}&enddate=${e.target.value}`) }} defaultValue={endDate} className='border border-black text-black ml-2' />
{/* <button type="submit" className="ml-2 px-2 py-1 border border-black" onClick={()=>router.push(`/dashboard/analysis?startdate=${startDate}&enddate=${endDate}`)}>Submit</button> */}
</div>
            <table className="w-full text-left">
                <thead className="text-xl bg-slate-400 text-black">
                    <tr>
                        <th className="p-2">#</th>
                        <th className="p-2">ID</th>
                        <th className="p-2">DATE</th>
                        <th className="p-2">TRANS ID</th>
                        <th className="p-2">MODE</th>
                        <th className="p-2">TOTAL PRICE</th>
                        <th className="p-2"></th>
                    </tr>

                </thead>
                <tbody>
                    {transectionData && transectionData.salesData.map((data, index) => (


                        <tr key={index} className="border-black" style={index % 2 ? { backgroundColor: "#c6c6c6", color: "#000" } : {}}>
                            <td className="text-sm px-2 py-1">{index + 1}</td>
                            <td className="text-sm px-2 py-1">{data?.id}</td>
                            <td className="text-sm px-2 py-1">{dateTimeFormat(data?.date)}</td>
                            <td className="text-sm px-2 py-1">{data?.transId}</td>
                            <td className="text-sm px-2 py-1">{data?.paymenttype}</td>
                            <td className="text-sm px-2 py-1">{data?.totalprice}</td>
                            <td className="text-sm px-2 py-1 cursor-pointer"><FaRegEye className="text-yellow-600" onClick={()=>router.push(`/dashboard/transection/${data?.transId}`)}/></td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    )
}