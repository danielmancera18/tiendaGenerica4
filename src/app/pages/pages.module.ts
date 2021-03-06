import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { ProductsComponent } from './products/products.component';
import { ClientsComponent } from './clients/clients.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProvidersComponent } from './providers/providers.component';
import { SalesComponent } from './sales/sales.component';
import { ReportComponent } from './report/report.component';
import { ConsolidationComponent } from './consolidation/consolidation.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ClientsComponent,
    LoginComponent,
    ProvidersComponent,
    SalesComponent,
    ReportComponent,
    ConsolidationComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    ProductsComponent,
    LoginComponent,
    ClientsComponent,
    ProvidersComponent
  ]
})
export class PagesModule { }
