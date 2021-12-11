import { OrderItem }  from './order-item'

export class Order {
    id = '';
    orderItems?: OrderItem[];
    shippingAddress1?:string;
    shippingAddress2?:string;
    city?: string;
    zip?: string;
    country?: string;
    status = 0;
    totalPrice?: string;
    user?: any;
    phone?: string;
    dateOrdered?: string;
}

