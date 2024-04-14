'use client'
import { useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlayCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { LuShoppingCart } from "react-icons/lu";

import CartItem from "../../components/CartItem";
import { CartInterface } from "../../utility/types";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {

  const router = useRouter();
  const [cartList, setCartList] = useState([{ title: "", id: "", qty: "", price: "" }]);

  const [cartItem, setCartItem] = useState<CartInterface[]>([]);

  const [subTotal, setSubTotal] = useState(0);


  const generateCartCode = () => {
    return String(Date.now().toString())
  }


  const updateTotalPrice = (cartList: any) => {
    let total = 0;
    for (let i = 0; i < cartList.length; i++) {
      const element = cartList[i];
      if (element.qty > 0 && element.price > 0) {
        const itemPrice = element.qty * element.price;
        total += itemPrice;
      }
    }
    setSubTotal(total);
  };

  const removeInputList = (index: number) => {
    const values = [...cartList];
    values.splice(index, 1);
    setCartList(values);
    updateTotalPrice(values)

    toast.success(`Remove ${index + 1} no. cartList !`, {
      position: "top-center",
    });


  };



  // Input data change

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newCartList = cartList.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setCartList(newCartList);
  };


  const handleSave = () => {


    let totalPrice = 0;
    for (let i = 0; i < cartList.length; i++) {
      const element = cartList[i];

      if (
        element.title.length > 0 &&
        element.id.length > 0 &&
        Number(element.qty) > 0 &&
        Number(element.price) > 0
      ) {
        const itemPrice = Number(element.qty) * Number(element.price);
        totalPrice += itemPrice;
      } else {
        // console.error("Please fill in all fields for item", i + 1);
        toast.error(`Please fill all the fields !`, {
          position: "top-center",
        });
        return;
      }
    }

    const cartCode = generateCartCode()
    const cartData = { cartCode, cartList, totalPrice };

    localStorage.setItem(cartCode, JSON.stringify(cartData));
    setCartList([{ title: "", id: "", qty: "", price: "" }]);

    // Update cartItem state with the new cartCode and totalPrice

    setCartItem([...cartItem, { cartCode, totalPrice }]);

    toast.success(`Product add in your localStorage !`, {
      position: "top-center"
    });
  };


  // Update total price on every cartList update

  useEffect(() => {
    updateTotalPrice(cartList);
  }, [cartList])


  const getStorageData = () => {
    const keys = Object.keys(localStorage);
    const filteredKeys = keys.filter((key) => key.length >= 12 && !isNaN(Number(key)));

    const data = filteredKeys.map((key) => {
      const value = JSON.parse(String(localStorage.getItem(key)));
      return { cartCode: value.cartCode, totalPrice: value.totalPrice };
    });

    setCartItem(data);
  };


  useEffect(() => {
    getStorageData()
  }, [])



  const handlePayNow = async () => {
    let totalPrice = 0;
    for (let i = 0; i < cartList.length; i++) {
      const element = cartList[i];

      if (
        element.title.length > 0 &&
        element.id.length > 0 &&
        Number(element.qty) > 0 &&
        Number(element.price) > 0
      ) {
        const itemPrice = Number(element.qty) * Number(element.price);
        totalPrice += itemPrice;
      } else {


        // console.error("Please fill in all fields for item", i + 1);

        toast.error(`Please fill all the fields !`, {
          position: "top-center",
      });
        return;
      }
    }

    const cartCode = generateCartCode()
    const cartData = { cartCode, cartList, totalPrice };

    localStorage.setItem(cartCode, JSON.stringify(cartData));
    setCartList([{ title: "", id: "", qty: "", price: "" }]);


    router.push(`/checkout?id=${cartCode}`)




  };


  return (
    <div className="w-screen flex  ">

      <div className="md:w-3/12 lg:w-2/12  h-screen bg-slate-100 relative sm:w-screen">

        {/* Crt list item show */}
        <>
          <p className="mt-2">Cart list item</p>
          <LuShoppingCart className="absolute right-3 top-2" />

          <div className="h-5"></div>

          {cartItem.map((item: CartInterface) => (
            <CartItem key={item.cartCode} cartCode={item.cartCode} totalPrice={item.totalPrice} setCartList={setCartList} getStorageData={getStorageData} />
          ))}
        </>
      </div>

      {/* Add product list */}

      <div className="w-full h-screen   sm:w-screen lg:w-10/12  ">
        {cartList.map((product, index) => {
          return (
            <div className="w-full flex items-center" key={index}>
              <div className="w-11/12 flex items-center border ">
                <input className="w-9/12 px-1 py-1 mr-2 border border-black" type="text" name="title" placeholder="title" value={product.title} required onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(index, event)} />
                <input className="w-9/12 px-1 py-1 mr-2  border border-black" type="text" name="id" placeholder="Product ID" value={product.id} required onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(index, event)} />
                <input className="w-9/12 px-1 py-1 mr-2  border border-black" type="number" name="qty" placeholder="Product QTY" value={product.qty} required onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(index, event)} />
                <input className="w-9/12 px-1 py-1  border border-black" type="number" name="price" placeholder="Product Price" value={product.price} required onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(index, event)} />



              </div>
              {cartList.length > 1 && (
                <AiOutlineMinusCircle className="ml-2 text-2xl text-black" onClick={() => removeInputList(index)} />
              )}

              {cartList.length - 1 === index && <AiOutlinePlusCircle className=" ml-2 text-2xl text-black" onClick={(e) => { e.preventDefault(); setCartList([...cartList, { title: "", id: "", qty: "", price: "" }]) }} />}
            </div>
          )
        })}

        <div className="flex justify-center mt-5">
          <button className="border p-2 mr-2  border-black" onClick={handleSave}>Save</button>
          <button className="border p-2 mr-2  border-black" disabled={subTotal === 0} onClick={handlePayNow}>Pay Now {subTotal > 0 && subTotal}</button>
        </div>
      </div>



      <ToastContainer />
    </div>
  );
}
