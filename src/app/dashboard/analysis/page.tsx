'use client';
import React, { useEffect, useContext } from 'react'
import Style from '@/app/styles/analysispage.module.css'
import Sells from '../../../../components/Sells'
import { useState } from 'react';
import { useAppContext } from '../../../../context/appContext';
import { useRouter } from 'next/navigation';
import { SellsDataInterface, SellsProductArrayInterface } from '../../../../utility/sells';


export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | string[] | undefined } }) {
    const { serverIp } = useAppContext();
    const router = useRouter();

    const [startDate, setStartDate] = useState<string>(`${searchParams?.startdate}`);
    const [endDate, setEndDate] = useState(`${searchParams?.enddate}`);

    const initialSalesData: SellsDataInterface = {
        salesData: [

            {
                date: '',
                product: [
                    {
                        title: '',
                        qty: '',
                        price: '',
                        totalPrice: '',
                    }
                ],
                totalPrice: 0
            }
        ],
        startDate: '',
        endDate: '',
        totalPrice: 0,
        totalLength: 0,
        totalCashPrice: 0,
        totalOnlineAmount: 0,
        totalReturnAmount: 0,
    };

    const initialSalesProduct: SellsProductArrayInterface = {
        salesProduct: [
            {
                id: '',
                title: '',
                qty: '',
                price: '',
                totalPrice: '',
            }
        ]
    }


    const [salesData, setSalesData] = useState<SellsDataInterface>(initialSalesData);

    const [products, setproducts] = useState<SellsProductArrayInterface>(initialSalesProduct);

    //   const fontColor = (theme === "system") ? userTheme() === 'dark' ? "#fff" : "#000" : (theme === 'dark') ? "#fff" : "#000";
    //   const tableFontColor = (theme === "system") ? userTheme() === 'dark' ? "#000" : "#fff" : (theme === 'dark') ? "#000" : "#fff";
    //   const backColor = (theme === "system") ? userTheme() === 'dark' ? "#515151" : "#D8D8D8" : (theme === 'dark') ? "#515151" : "#D8D8D8";
    //   const tableHeadingBackColor = (theme === "system") ? userTheme() === 'dark' ? "#C6C6C6" : "#E63131" : (theme === 'dark') ? "#C6C6C6" : "#E63131";
    //   const tableBackColor = (theme === "system") ? userTheme() === 'dark' ? "#C6C6C6" : "#FA65E1" : (theme === 'dark') ? "#C6C6C6" : "#FA65E1";




    const rangeSellData = async (startDate: string, endDate: string) => {

        try {
            const response = await fetch(`${serverIp}/api/sells/sellsbardata?startDate=${startDate}&endDate=${endDate}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json()
            // console.log("Range sellsbar data", data)
            setSalesData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const sellsData = async (startDate: string, endDate: string) => {
        const stDate = startDate; // Replace with your desired start date
        const enDate = endDate; // Replace with your desired end date

        try {
            const response = await fetch(`${serverIp}/api/sells/salesproduct?startDate=${startDate}&endDate=${endDate}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json()
            // console.log("Sells Data", data)
            setproducts(data);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        rangeSellData(startDate, endDate);
        sellsData(startDate, endDate)
    }, [startDate, endDate])

    return (
        <>
            {/* Dashboard analysis component start */}
            <div className="w-full h-full bg-slate-200 text-black px-2" >
                <div className='w-fit flex items-center justify-between my-1'>

                    <label htmlFor="stdate" className='mr-4'>Start date</label>  <input type="date" name="stdate" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setStartDate(e.target.value); router.push(`/dashboard/analysis?startdate=${e.target.value}&enddate=${endDate}`) }} defaultValue={startDate} className='border border-black text-black' />
                    <label htmlFor="endate" className='ml-4'>End date</label>
                    <input type="date" name="endate" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEndDate(e.target.value); router.push(`/dashboard/analysis?startdate=${startDate}&enddate=${e.target.value}`) }} defaultValue={endDate} className='border border-black text-black ml-2' />
                    {/* <button type="submit" className="ml-2 px-2 py-1 border border-black" onClick={()=>router.push(`/dashboard/analysis?startdate=${startDate}&enddate=${endDate}`)}>Submit</button> */}
                </div>
                {/* Analysis card component */}
                <div className="w-full h-fit my-1 flex justify-between items-center">
                    <div className=" w-80 h-36 flex flex-col justify-center items-center border border-black" >
                        <h4>Total Sells</h4>
                        <p>{salesData?.totalPrice} Rs.</p>
                    </div>

                    <div className="${Style.cashpayment} w-80 h-36 flex flex-col justify-center items-center border border-black">
                        <h4>Return Amount</h4>

                        <p>{salesData.totalReturnAmount} Rs.</p>
                    </div>

                    <div className="${Style.totalsells} w-80 h-36 flex flex-col justify-center items-center border border-black" >
                        <h4>Cash Payment</h4>
                        <p>{salesData.totalCashPrice} Rs.</p>
                    </div>
                    <div className="${Style.totalsells} w-80 h-36 flex flex-col justify-center items-center border border-black" >
                        <h4>Online Payment</h4>
                        <p>{salesData.totalOnlineAmount} Rs.</p>
                    </div>
                </div>
                {/* Analysis card component end */}

                <div className="h-fit border border-black">
                    <Sells salesData={salesData.salesData} totalPrice={salesData.totalPrice} startDate={salesData?.startDate} endDate={salesData?.endDate} totalLength={salesData.totalLength} totalCashPrice={salesData?.totalCashPrice} totalOnlineAmount={salesData?.totalOnlineAmount} totalReturnAmount={salesData?.totalReturnAmount} />
                </div>

                {/* Dashboard  static graph table start */}
                <div className="w-full h-96 flex items-center justify-between mt-1">
                    <div className="w-2/5 h-full overflow-y-auto border border-black">
                        <div className="flex my-2 mx-1">
                            <p>Static Graph</p>
                            <select className="ml-4 text-black bg-transparent">
                                <option value="all" id='prooption'>All</option>
                                <option value="pro1">product 1</option>
                                <option value="pro2">Product 2</option>
                                <option value="pro3">Product 3</option>
                                <option value="pro4">Product 4</option>
                            </select>
                        </div>
                        {/* Selection option end */}

                        <table className="w-full text-left">
                            <thead className="text-xl bg-slate-400 text-black">
                                {/* <tr>
                                    <th className="p-2">#</th>
                                    <th className="p-2">PRODUCT NAME</th>
                                    <th className="p-2">QTY</th>
                                    <th className="p-2">PRICE</th>
                                    <th className="p-2">TOTAL</th>
                                </tr> */}
                                <tr>
                                    <th className="p-2">#</th>
                                    <th className="p-2">ID</th>
                                    <th className="p-2">PRODUCT NAME</th>
                                    <th className="p-2">QTY</th>
                                    <th className="p-2">PRICE</th>
                                    <th className="p-2">TOTAL</th>
                                </tr>

                            </thead>
                            <tbody>

                                {products.salesProduct && products.salesProduct.map((data, index) => (


                                    <tr key={index} className="border-black" style={index % 2 ? { backgroundColor: "#c6c6c6", color: "#000" } : {}}>
                                        <td className="text-sm px-2">{index + 1}</td>
                                        <td className="text-sm px-2">{data?.id}</td>
                                        <td className="text-sm px-2">{data?.title}</td>
                                        <td className="text-sm px-2">{data?.qty}</td>
                                        <td className="text-sm px-2">{data?.price}</td>
                                        <td className="text-sm px-2">{data?.totalPrice}</td>
                                    </tr>

                                ))}
                                {/* {salesData.salesData && salesData.salesData.map((data, index) => (
                                    data.product.map((item, index) => (

                                        <tr key={index} className="border-black" style={index % 2 ? { backgroundColor: "#c6c6c6", color: "#000" } : {}}>
                                            <td className="text-sm px-2">{index + 1}</td>
                                            <td className="text-sm px-2">{item.title}</td>
                                            <td className="text-sm px-2">{item.qty}</td>
                                            <td className="text-sm px-2">{item.price}</td>
                                            <td className="text-sm px-2">{item.totalPrice}</td>
                                        </tr>
                                    ))
                                ))} */}
                            </tbody>
                        </table>
                    </div>

                    {/* Static graph */}
                    <div className="w-2/4 h-full border border-black">
                        <div className="flex mt-2 mx-1">
                            <p>Static Graph</p>
                            <select className="ml-4 text-black bg-transparent" id='catoption' style={{ color: "#000" }}>
                                <option value="all">All</option>
                                <option value="cat1" >Category 1</option>
                                <option value="cat2">Category 2</option>
                                <option value="cat3">Category 3</option>
                                <option value="cat4">Category 4</option>
                            </select>
                        </div>
                        {/* Selection option end */}

                    </div>

                </div>

            </div>
            {/* Dashboard analysis component end */}
        </>
    )
}

