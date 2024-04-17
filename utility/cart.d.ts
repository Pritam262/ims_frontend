export interface CartInterface {
    cartCode:string,
    totalPrice:number,

}


export interface CartItemInterface {
    cartCode:string,
    totalPrice:number,
    setCartList:any,
    getStorageData:any
  }