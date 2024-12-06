export interface OrderItem {
  item_id: string;
  orderItemId?: string;
  department: string;
  item_category: string;
  description?: string;
  item_name: string;
  item_supplier: string;
  unit_price: number;
  quantity: number;
}

export interface Order {
  id?: string;
  order_id?: string;
  order_date: string;
  status: string;
  paymentStatus: boolean;
  total_amount: number;
  orderItems: OrderItem[];
}

export interface Item {
  item_id?: string;
  category: string;
  department: string;
  item_name: string;
  batch_number: string;
  expiry_date: string;
  quantity: number;
  unit_price: number;
}

export interface CartItem {
  id: string;
  item_id: string;
  item_name: string;
  quantity: number;
  supplier: string;
  unit_price: number;
  department: string;
}
