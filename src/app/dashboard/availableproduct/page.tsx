'use client'

import { useEffect, useState } from "react"
import dateTimeFormat from "../../../../lib/dateTimeFormat"
import { useAppContext } from "../../../../context/appContext"
interface AvailableProduct {
    products: {
        id: string,
        title: string,
        productId: string,
        qty: string,
        unit: string,
        price: string,
        totalPrice: string,
        date: string,
    }[]
}
export default function AvailableProductPage() {

    const initialProducts = {
        products: [{
            id: '',
            title: '',
            productId: '',
            qty: '',
            unit: '',
            price: '',
            totalPrice: '',
            date: '',
        }]
    }
    // const [products, setProducts] = useState<AvailableProduct>(initialProducts)
    const [products, setProducts] = useState<AvailableProduct>()
const {serverIp} = useAppContext();


    const getAllProducts = async () => {
        try {

            const response = await fetch(`${serverIp}/api/product/fetchallproduct`, { credentials: 'include', headers: { 'Content-Type': 'application/json' } });

            setProducts(await response.json());
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(()=>{
        getAllProducts();
    },[])
    return <div className="w-full">
        <p>Available product</p>

        <table className="w-full text-left">
                <thead className="text-xl bg-slate-400 text-black">
                    <tr>
                        <th className="p-2">#</th>
                        <th className="p-2">ID</th>
                        {/* <th className="p-2">DATE</th> */}
                        <th className="p-2">PRODUCT ID</th>
                        <th className="p-2">TITLE</th>
                        <th className="p-2">QTY</th>
                        <th className="p-2">PRICE</th>
                        <th className="p-2">TOTAL PRICE</th>
                    </tr>

                </thead>
                <tbody>
                    {products?.products && products?.products.length >0 && products.products.map((data, index) => (


                        <tr key={index} className="border-black" style={index % 2 ? { backgroundColor: "#c6c6c6", color: "#000" } : {}}>
                            <td className="text-sm px-2 py-1">{index + 1}</td>
                            <td className="text-sm px-2 py-1">{data?.id}</td>
                            {/* <td className="text-sm px-2 py-1">{dateTimeFormat(data?.date)}</td> */}
                            <td className="text-sm px-2 py-1">{data?.productId}</td>
                            <td className="text-sm px-2 py-1">{data?.title}</td>
                            <td className="text-sm px-2 py-1">{data?.qty}</td>
                            <td className="text-sm px-2 py-1">{data?.price}</td>
                            <td className="text-sm px-2 py-1 cursor-pointer">{data?.totalPrice}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
    </div>
}