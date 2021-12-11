import { Component, OnInit } from '@angular/core';
import { CartService } from '@holystone/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'ngshop-messages',
  templateUrl: './messages.component.html',
  styles: [
  ]
})
export class MessagesComponent implements OnInit {

  constructor(private messageService : MessageService,
              private cartService : CartService) { }

  ngOnInit(): void {

      this.cartService.cart$.subscribe((a)=>{

        console.log(a); 

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Cart Updated!'
      })
    })

  }

}
