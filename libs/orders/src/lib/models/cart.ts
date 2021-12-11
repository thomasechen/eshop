export class Cart {
    items: CartItem[] = [];
}


export class CartItem {
   productId = '';
   quantity = 0;
}

export class CartItemDetailed {
    product?: any
    quantity = 0;
}