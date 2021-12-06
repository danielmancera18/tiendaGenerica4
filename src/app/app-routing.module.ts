import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './pages/clients/clients.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { ReportComponent } from './pages/report/report.component';
import { SalesComponent } from './pages/sales/sales.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'clientes', component: ClientsComponent},
  {path: 'productos', component: ProductsComponent},
  {path: 'proveedores', component: ProvidersComponent},
  {path: 'ventas', component: SalesComponent},
  {path: 'reportes', component: ReportComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
