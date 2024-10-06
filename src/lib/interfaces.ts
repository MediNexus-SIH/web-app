export interface OrderItem {
  item: {
    category?: string;
    description?: string;
    item_id: string;
    item_name?: string;
    supplier?: string;
    unit_price?: number
  };
  quantity: number;
  unit_price: number;
}


export interface Order {
  id: string;
  order_id: string;
  order_date: string;
  status: string;
  paymentStatus: boolean;
  total_amount: number;
  hospital: {
    hospitalName: string;
  };
  orderItems: OrderItem[];
}