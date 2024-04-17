'use client'
import { useState } from "react";
import { useAppContext } from "../../../../context/appContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function AddProductPage(){

    const {serverIp} = useAppContext();
    
    const [data,setData] = useState({title:"", id:"", qty:"", unit:"", price:""});

    const handleChnageInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const handleAddProduct = async () => {
        
        const response = await fetch(`${serverIp}/api/product/addproduct`,{
            method:'post',
            credentials:'include',
            headers:{
                'Content-Type':"application/json",
            },
            body:JSON.stringify(data),
        });

      if(response && response.status === 200){
          toast.success('Product add Successfully', {
              position: "top-center"
          });
          setData({ title: "", id: "", qty: "", unit: "", price: "" })

      }else{
        console.log(response);
        
        toast.error(`${response.statusText}`, {
            position: "top-center"
        });
      }
        
      }

    return(
        <div className="w-96 h-full flex flex-col items-center  ml-5 ">
            <div className="w-full flex items-center justify-between"> 
                <label htmlFor="title">Product name</label>
                <input className="w-8/12 px-2 py-1 mb-2 bg-transparent border-b-black border" type="text" name="title"  placeholder="Product name" onChange={handleChnageInput} value={data?.title} required/>
            </div>
            <div  className="w-full flex items-center justify-between">
                <label htmlFor="id">ID</label>
                <input  className="w-8/12 px-2 py-1 mb-2 bg-transparent border-b-black border"type="number" name="id" placeholder="Product ID" onChange={handleChnageInput} value={data?.id} required/>
            </div>
            <div  className="w-full flex items-center justify-between">
                <label htmlFor="qty">Qty</label>
                <input  className="w-8/12 px-2 py-1 mb-2 bg-transparent border-b-black border"type="number" name="qty" placeholder="Product Qty" onChange={handleChnageInput} value={data?.qty} required/>
            </div>
            <div  className="w-full flex items-center justify-between">
                <label htmlFor="unit">Unit</label>
                <input  className="w-8/12 px-2 py-1 mb-2 bg-transparent border-b-black border"type="text" name="unit"  placeholder="Product Unit" onChange={handleChnageInput} value={data?.unit} required/>
            </div>
            <div  className="w-full flex items-center justify-between">
                <label htmlFor="price">Price</label>
                <input  className="w-8/12 px-2 py-1 mb-2 bg-transparent border-b-black border"type="number" name="price"  placeholder="Product Price" onChange={handleChnageInput} value={data?.price} required/>
            </div>

            <button className="mt-10 border border-black px-2 py-1" onClick={handleAddProduct}>Add product</button>

            <ToastContainer />
        </div>
    )
}