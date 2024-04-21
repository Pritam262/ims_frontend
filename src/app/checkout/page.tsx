'use client'

import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/appContext";
import { useRouter } from "next/navigation";
import generateTransId from "../../../lib/generatetransid";

interface CheckoutProduct {
    cartList: [{
        title: string,
        id: string,
         qty: number,
        price: number,
    }],
    totalPrice: number,
}
export default function CheckoutPage({ params, searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | string[] | undefined } }) {


    const { serverIp, RAZORPAY_API_KEY } = useAppContext();
    const router = useRouter();

    const [data, setData] = useState<CheckoutProduct | null>(null);

    const [mode, setMode] = useState('cash');
    const [cashAmount, setCashAmount] = useState<number>(0);

    const [paymentId, setPaymentId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        const fetchData = () => {
            const storedData = localStorage.getItem(`${searchParams.id}`);
            const jsonData:CheckoutProduct = storedData && JSON.parse(storedData);
            setData(jsonData);
        };

        fetchData();
    }, [searchParams.id]);


    const addSellsProduct = async (cartList: any, cashAmount: number, totalPrice: number, returnAmount: number, mode: string, orderId: string) => {
        try {
            const response = await fetch(`${serverIp}/api/sells/addproduct`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product: cartList,
                    paymenttype: mode,
                    totalprice: totalPrice,
                    cashamount: Number(cashAmount),
                    returnamount: returnAmount,
                    orderid: orderId
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add sells product');
            }

            const data = await response.json();

            localStorage.removeItem(`${searchParams.id}`)
            
            console.log('Sells product added:', data);
        } catch (error: any) {
            throw new Error(error.message);
        }

    };


    const handlePayNow = async () => {
        if (mode === 'cash') {
            let orderId = generateTransId(30);

            if (cashAmount > data!.totalPrice) {

                // Calculate the return amount
                const returnAmount = cashAmount - data!.totalPrice

                // console.log(orderId)

                try {


                    await addSellsProduct(data?.cartList, cashAmount, data!.totalPrice, returnAmount, mode, orderId);
                    router.push("/")

                    // console.log('Saving to MongoDB: >', cartList, data?.totalPrice, returnAmount);
                } catch (error) {
                    console.error('Failed to save sells product:', error);
                }
            }
            else if (cashAmount === data?.totalPrice) {



                const returnAmount = cashAmount - data?.totalPrice;

                try {
                    // Save cartList, data?.totalPrice, and returnAmount to MongoDB database
                    await addSellsProduct(data?.cartList, cashAmount, data?.totalPrice, returnAmount, mode, orderId);
                    router.push("/")
                    // console.log('Saving to MongoDB on ===:', cartList, data?.totalPrice,cashAmount);
                } catch (error) {
                    console.error('Failed to save sells product:', error);
                }
            }
        } else if (mode === 'online') {
            // Redirect to Razorpay payment gateway

            try {

                const response = await fetch(`${serverIp}/api/payment/create-order`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify({ amount: data?.totalPrice }),
                })

                const resData = await response.json();

                // console.log(data)
                const options = {
                    key: RAZORPAY_API_KEY, // Razorpay Key ID
                    amount: Number(resData?.totalPrice * 100), // Example amount
                    currency: 'INR',
                    name: 'IMS',
                    description: 'Purchase description',
                    order_id: resData.order.id,
                    notes: {
                        address: "Razorpay Corporate Office"
                    },
                    theme: {
                        color: "#A951F0"
                    },
                    handler: async function (response: any) {

                        // console.log(response)
                        try {
                            const paymentResponse = await fetch(`${serverIp}/api/payment/varify-payment`, {
                                method: 'POST',
                                credentials: 'include',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ 'payment_id': response.razorpay_payment_id, 'order_id': response.razorpay_order_id, 'signature': response.razorpay_signature, amount: data?.totalPrice, product: data?.cartList })
                            });

                            console.log(await paymentResponse.json())
                            setPaymentId(response.razorpay_payment_id);
                            localStorage.removeItem(`${searchParams.id}`)
                            router.push('/');
                        } catch (error) {
                            console.error('Error processing payment:', error);
                            setErrorMessage('Error processing payment');
                        }
                    },
                };


                // To disable Razorpay not found
                
                // @ts-ignore
                const razorpayInstance = new Razorpay(options);

                razorpayInstance.open();

                // console.log(window);


            } catch (error: any) {
                console.log("Error", error.message)
            }

        }
    };


    return (
        <div className="w-screen h-screen flex flex-col items-center">
            <div className="w-80 h-96 bg-slate-300 mt-20">

                <div className="flex items-center border">
                    <div className="w-5 h-5 border border-black mr-2" onClick={() => setMode('cash')}>
                        {mode === "cash" && <svg id="eGHmwTEUjQx1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shapeRendering="geometricPrecision" textRendering="geometricPrecision"><path d="M3.442792,11.182478C6.083623,11.68725,8.607643,15.369444,8.92308,17.5c2.017493-4.151157,7.328382-8.748402,12.029969-9.831635" transform="matrix(1.022924 0 0 1.028659-.477546-.944832)" paintOrder="markers fill stroke" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                    <p >Cash</p>
                </div>
                <div className="flex border items-center ">

                    <div className="w-5 h-5 border border-black mr-2" onClick={() => setMode("online")}>
                        {mode === "online" && <svg id="eGHmwTEUjQx1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shapeRendering="geometricPrecision" textRendering="geometricPrecision"><path d="M3.442792,11.182478C6.083623,11.68725,8.607643,15.369444,8.92308,17.5c2.017493-4.151157,7.328382-8.748402,12.029969-9.831635" transform="matrix(1.022924 0 0 1.028659-.477546-.944832)" paintOrder="markers fill stroke" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>

                    <p>Pay Online</p>
                </div>

                <p>Total price: {data?.totalPrice}</p>

                {mode === 'cash' && (
                    <>
                        <input
                            type="number"
                            name="cashAmount"
                            value={cashAmount}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCashAmount(Number(event.target.value))}
                            placeholder="Enter cash amount"
                            className={""}
                        />
                        <div className="h-15 w-full">

                            {data && cashAmount < data?.totalPrice && <p style={{ color: 'red' }}>Cash amount should be equal to or greater than the {data?.totalPrice}.</p>}
                        </div>
                    </>
                )}


                <button onClick={handlePayNow} className="px-2 py-1 border border-black">Pay Now</button>
            </div>
        </div>
    )
}