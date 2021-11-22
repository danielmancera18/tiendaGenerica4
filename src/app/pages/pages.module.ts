import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { ProductsComponent } from './products/products.component';
import { ClientsComponent } from './clients/clients.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ClientsComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports:[
    ProductsComponent,
    LoginComponent,
    ClientsComponent
  ]
})
export class PagesModule { }
