import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'admin-dashboaard',
  templateUrl: './dashboaard.component.html',
  })
export class DashboaardComponent implements OnInit {

  Ordercounts!: number;
  Productcounts!: number;
  Usercounts!: number;
  TotalSalesAmount!: number;

  constructor(private dashboardService : DashboardService) { }

  ngOnInit(): void {
    this._getOrderCounts();
    this._getProductCounts();
    this._getUserCounts();
    this._getTotalSales();
  }


 private _getOrderCounts(){
  this.dashboardService.getOrderCounts().subscribe((ordercounts)=>{
  this.Ordercounts = ordercounts;
   })

 }

 private _getProductCounts(){
  this.dashboardService.getProductCounts().subscribe((productcounts)=>{
  this.Productcounts = productcounts;
   })

 }

 private _getUserCounts(){
  this.dashboardService.getUserCounts().subscribe((usercounts)=>{
  this.Usercounts = usercounts;
   })

 }

 private _getTotalSales(){
  this.dashboardService.getTotalSales().subscribe((salesamount)=>{
  this.TotalSalesAmount = salesamount;
   })

 }


}
