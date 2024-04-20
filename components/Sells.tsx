"use client"
import React from 'react'

import LineChart from './LineChart'
import { SellsDataInterface } from '../utility/sells';
// import ProductContext from '@/app/context/ProductContext'


function Sells(props: SellsDataInterface) {

  //   const context = useContext(ProductContext)
  //   const { rangeSellData, salesData,theme,userTheme } = context
  //   const color = (theme==="system")? userTheme()==='dark'?"#fff":"#000":(theme==='dark')?"#fff" :"#000";
  const fontColor = '#fff';


  return (
    <div className="w-full h-80 pb-12 text-black" >
      <h4 >Sales Chart - between {props.salesData === undefined ? "No Date" : props.startDate} and  {props.salesData === undefined ? "No Date" : props.endDate}</h4>

      {props.salesData === undefined || props.totalLength === 0 ? <p >Chart is not availabe</p> : <LineChart sellsData={props.salesData} totalLength={props.totalLength} />}

    </div>
  )
}

export default Sells