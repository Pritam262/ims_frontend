export interface SellsDataInterface {
  salesData: {
    date: string;
    product: {
      title: string;
      qty: string;
      price: string;
      totalPrice: string;
    }[];
    totalPrice: number;
  }[];
  totalLength: number;
  totalPrice: number,
  totalLength: number,
  startDate: string,
  endDate: string,
  totalCashPrice: number,
  totalOnlineAmount: number,
  totalReturnAmount: number,
}

export interface LineChartDataInterface {
  sellsData: {
    date: string;
    product: {
      title: string;
      qty: string;
      price: string;
      totalPrice: string;
    }[];
    totalPrice: number;
  }[];
  totalLength: number;
}

export interface SellsProductArrayInterface {
  salesProduct: {
    id: string,
    title: string,
    qty: string,
    price: string,
    totalPrice: string,
  }[]
}