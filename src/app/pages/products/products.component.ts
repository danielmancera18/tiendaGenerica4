import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  listaP = ["Código","NitProveedor","Nombre","PrecioCompra","IvaCompra","PrecioVenta"]

  res:any;
  contenido:any;
  urlapi:string = "http://localhost:8080/productos/productos"
  urlapiDelete:string = "http://localhost:8080/productos/productos/delete"


  editar:boolean = false

  constructor(private objetohttp:HttpClient) { }

  ngOnInit(): void {
    this.res = this.objetohttp.get(this.urlapi)
    this.res.subscribe((data:any[])=>{
      this.contenido = data
      console.log(this.contenido)
    })

  }
  eliminarTodo(event: Event){
    event.preventDefault()
    this.objetohttp.delete(this.urlapiDelete).subscribe((res)=>{
      console.log(res)
    })
  }

  editarProducto(){
    this.editar = true
  }
  cancelarEdit(){
    this.editar = false
  }
}
