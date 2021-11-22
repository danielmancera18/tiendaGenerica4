import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  listaP = ["Cédula","Nombre Completo","Dirección","Télefono","Correo Electrónico"]

  res:any;
  contenido:any;
  urlapi:string = "http://localhost:8080/productos/productos"

  editar:boolean = false
  constructor() { }

  ngOnInit(): void {
  }
  editarProducto(){
    this.editar = true
  }
  cancelarEdit(){
    this.editar = false
  }

}
