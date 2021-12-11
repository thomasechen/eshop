/* eslint-disable @typescript-eslint/no-explicit-any */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService,ORDER_STATUS } from '@holystone/orders';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {

  order!: Order;
  orderStatuses!: any[];
  selectedStatus!: string ;

  constructor(private ordersService: OrdersService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private location:Location) { }

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();

  }

  onCancel() {
    this.location.back();
  }

  onStatusChange(event){
    this.ordersService.updateOrder({status: event.value},this.order.id).subscribe((response: Order)=>{
      this.messageService.add({severity:'success', summary:'Success',detail:`Order ${response.id} is updated`});
      timer(2000).toPromise().then(()=>{
        this.location.back();
      })
    },(error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:error});
    })
  }

 private _mapOrderStatus() {
  
      this.orderStatuses = Object.keys(ORDER_STATUS).map( (value)=>{
       return {
            index: value,
            content: ORDER_STATUS[value].label,
        }
      })
 }

  private _getOrder() {
    this.route.params.subscribe((query)=>{
      if (query.id) {
         this.ordersService.getOrder(query.id).subscribe((order)=>{
         this.order = order;
         this.selectedStatus = order.status.toString();
          }) ;
      } 
    })
  }


}
