// export default async  function  TransectionDetailsPage  ({params}:{params:{transid:string}}) {

//     try {
//         const response = await fetch(`
//         http://192.168.50.14:3000/api/transection/gettransection?transid=${params?.transid}`, {
//             credentials: 'include'
//         });

//         if (!response.ok) {
//             throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
//         }

//         const data = await response.json();
//         console.log(data);
//         return <div>Transaction: {params?.transid}</div>;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return <div>Error fetching data. Please try again later.</div>;
//     }

//     // return <div>Transection: {params?.transid}</div>
// }

'use client'

import { useEffect, useState } from "react";
import dateTimeFormat from "../../../../../lib/dateTimeFormat";

interface TransactionItemInterface {

    id: string,
    paymenttype: string,
    razorpay_payment_id: string,
    totalprice: string,
    transId: string,
    user: string,
    date: string,
    product: {
        id: string,
        title: string,
        qty: string,
        price: string
    }[]

}

export default function TransectionDetailsPage({ params }: { params: { transid: string } }) {

    const initialData: TransactionItemInterface = {

        id: '',
        paymenttype: '',
        razorpay_payment_id: '',
        totalprice: '',
        transId: '',
        user: '',
        date: '',
        product: [{
            id: '',
            title: '',
            qty: '',
            price: ''
        }]

    }


    const [data, setData] = useState<TransactionItemInterface>(initialData);
    const getTransection = async () => {

        try {
            const response = await fetch(`
            http://192.168.50.14:3000/api/transection/gettransection?transid=${params?.transid}`, {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setData(data.transection)
            console.log(data.transection);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getTransection();
    }, [])
        console.log("Date",data?.date)
    return <div className="w-4/6 mx-auto">
        <p>Transection: {params?.transid}</p>
        <p>ID: {data?.id}</p>
        <p>Payment Id: {data?.transId}</p>
        <p>Payment Mode: {data?.paymenttype}</p>
       {data?.razorpay_payment_id && <p>Razorpay Id: {data?.razorpay_payment_id}</p>}
        <p>Transection Value: {data?.totalprice}</p>
        <p>Date: {data?.date && dateTimeFormat(data?.date)}</p>

        <table className="w-full text-left">
            <thead className="text-xl bg-slate-400 text-black">
                <tr>
                    <th className="p-2">#</th>
                    <th className="p-2">ID</th>
                    <th className="p-2">Product Name</th>
                    <th className="p-2">Qty</th>
                    <th className="p-2">PRICE</th>
                </tr>

            </thead>
            <tbody>
                {data.product && data.product.map((data, index) => (


                    <tr key={index} className="border-black" style={index % 2 ? { backgroundColor: "#c6c6c6", color: "#000" } : {}}>
                        <td className="text-sm px-2 py-1">{index + 1}</td>
                        <td className="text-sm px-2 py-1">{data?.id}</td>

                        <td className="text-sm px-2 py-1">{data?.title}</td>
                        <td className="text-sm px-2 py-1">{data?.qty}</td>
                        <td className="text-sm px-2 py-1">{data?.price}</td>
                    </tr>

                ))}
            </tbody>
        </table>

    </div>
}