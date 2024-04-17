"use client"
import React, { useEffect } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { CartItemInterface } from '../utility/cart';

export default function CartItemComponent( props:CartItemInterface) {

{/* on editData btn click get the id and get the data from localStorage then it show on home page  using cartItem react state addHookAliases. */}

  const editData = (id:string) => {
    if (id) {

      // console.log(id)

      // Retrieve the data from localStorage using the cartCode
      const cartData = JSON.parse(String(localStorage.getItem(id.toString())));
      
      // Check if the cartData exists
      if (cartData) {
        // Extract the cartList from the cartData
        const { cartList } = cartData;
        
        // console.log(cartData)

        // Set the cartItem state in the Home component using setCartItem

        props.setCartList(cartData.cartList);
        deleteData(id)
      }
    }
  };

  const deleteData = (id:string)=>{
    localStorage.removeItem(id)
    props.getStorageData()
  }
// useEffect(() => {
//   props.getStorageData()
// }, [])


  return (
    <div  className='w-full'>
      <table className='md:w-full text-center'>
        <thead>
          <tr >
            <th className='sm:text-sm md:text-sm'>Cart Code</th>
            <th className='sm:text-sm md:text-sm'>Total Price</th>
            <th>
              <AiOutlinePlusCircle className='text-2xl' onClick={() => editData(props.cartCode)} /> {/* Pass the cartCode as the argument */}
            </th>
            <th>
              <AiOutlineMinusCircle className='text-2xl'  onClick={()=>deleteData(props.cartCode)}/> {/* Pass the cartCode as the argument */}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr key={props.cartCode}>
            <td>{props.cartCode}</td>
            <td>{props.totalPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


