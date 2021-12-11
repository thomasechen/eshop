import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboaardComponent } from './pages/dashboaard/dashboaard.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesService, ProductsService } from '@holystone/products';
import { DashboardService } from './pages/dashboaard/dashboard.service';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast'
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule }  from 'primeng/colorpicker';
import { InputNumberModule }  from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { AuthGuardService, JwtInterceptor, UsersModule } from '@holystone/users';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { OrdersModule } from '@holystone/orders';
import { NgxStripeModule } from 'ngx-stripe';



const routes: Routes =[
    { path : '', component: ShellComponent,canActivate: [AuthGuardService],children: [
      {path: 'dashboard',component: DashboaardComponent},
      {path: 'categories',component: CategoriesListComponent},
      {path: 'categories/form',component: CategoriesFormComponent},
      {path: 'categories/form/:id',component: CategoriesFormComponent},
      {path: 'products',component: ProductsListComponent},
      {path: 'products/form',component: ProductsFormComponent},
      {path: 'products/form/:id',component: ProductsFormComponent},
      {path: 'users',component: UsersListComponent},
      {path: 'users/form',component: UserFormComponent},
      {path: 'users/form/:id',component: UserFormComponent},
      {path: 'orders',component: OrdersListComponent},
      {path: 'orders/:id',component: OrdersDetailComponent},
    ]}
]  ;


@NgModule({
    declarations: [AppComponent, ShellComponent, SidebarComponent, DashboaardComponent, CategoriesListComponent, CategoriesFormComponent, ProductsListComponent, ProductsFormComponent, UsersListComponent, UserFormComponent, OrdersListComponent, OrdersDetailComponent],
    imports: [UsersModule,FieldsetModule,InputMaskModule,TagModule,EditorModule,DropdownModule,InputSwitchModule,InputTextareaModule,InputNumberModule,ColorPickerModule,ConfirmDialogModule,ToastModule,FormsModule,ReactiveFormsModule,HttpClientModule,InputTextModule,BrowserModule,BrowserAnimationsModule, RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),CardModule,ToolbarModule,ButtonModule,TableModule,
              OrdersModule,StoreModule.forRoot({}),EffectsModule.forRoot([]),NgxStripeModule.forRoot('pk_test_51K3L0WJgSiFdUOfY8CxGRShpB2iKQznrToY5ZbekarOGn0xLwJTbYZYUWDkdOHMDeKY1g3vUSjIbx3iSN5dPYMDs00SXh5cqEN')],
    providers: [CategoriesService,MessageService,ConfirmationService,ProductsService,DashboardService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule {}
