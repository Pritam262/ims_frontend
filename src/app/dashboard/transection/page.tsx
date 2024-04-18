'use client'
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../context/appContext"
import dateTimeFormat from "../../../../lib/dateTimeFormat";
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
export default function TransectionPage() {

    const { serverIp } = useAppContext();

    const [transectionData, setTransectionData] = useState<TransectionInterface>();

    const fetchTransectionData = async (startDate: string, endDate: string) => {
        const response = await fetch(`${serverIp}/api/transection?startDate=${startDate}&endDate=${endDate}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });

        setTransectionData(await response.json());

        // console.log(resData);
    }


    useEffect(() => {
        fetchTransectionData('2024-01-01', '2024-12-31')
    }, [])
    return (
        <div className="w-full">
            <table className="w-full text-left">
                <thead className="text-xl bg-slate-400 text-black">
                    <tr>
                        <th className="p-2">#</th>
                        <th className="p-2">ID</th>
                        <th className="p-2">DATE</th>
                        <th className="p-2">TRANS ID</th>
                        <th className="p-2">MODE</th>
                        <th className="p-2">TOTAL PRICE</th>
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
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    )
}