import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule, Routes} from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductsSearchComponent } from './components/search/search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@holystone/ui'


const routes: Routes = [
  {
    path: 'products', component: ProductsListComponent

  },
  {
    path: 'products/category/:categoryid', component: ProductsListComponent
    
  },
  {
    path: 'products/:productid', component: ProductPageComponent
    
  }
]


@NgModule({
    imports: [CommonModule,
               RouterModule.forChild(routes),
               ButtonModule,
               CheckboxModule,
               FormsModule,
               RatingModule,
               InputNumberModule,
               UiModule
               ],
    declarations: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProductItemComponent,
      FeaturedProductsComponent,
      ProductsListComponent,
      ProductPageComponent,
    ],
    exports:[ProductsSearchComponent, 
            CategoriesBannerComponent,
            ProductItemComponent,
            FeaturedProductsComponent,
            ProductsListComponent,
            ProductPageComponent,
    ],
    providers : []
})
export class ProductsModule {}
