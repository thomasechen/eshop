import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService,ORDER_STATUS } from '@holystone/orders';
import { ConfirmationService, MessageService } from 'primeng/api';



@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];
  orderstatus = ORDER_STATUS;
 
  constructor(private ordersService: OrdersService,
              private router: Router,
              private messageService : MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getOrders();
  }


  getOrders() {
    this.ordersService.getOrders().subscribe((orders)=>{
      this.orders = orders;
      console.log(this.orders);
    })
  }



  deleteOrder(orderid: string) {  
    this.confirmationService.confirm({
      message: 'Do you want to delete this Order?',
      header: 'Delete Order: ${orderid}',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderid).subscribe( () =>{
          this.getOrders();
          this.messageService.add({severity:'success', summary:'Success', detail:'The order is deleted!'});
        },()=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'The order is not deleted!'});
         } );
      },

  });

  }

  updateOrder(orderid : string) { 
    this.router.navigateByUrl(`/orders/${orderid}`);
  }


}
