import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  listaP = ["Cédula","Nombre Completo","Dirección","Télefono","Correo Electrónico"]

  res:any;
  contenido:any;
  clientes: number = -1
  urlapi:string = "http://localhost:8081/clientes"
  
  constructor(private objetohttp:HttpClient) { }

  ngOnInit(): void {
    this.res = this.objetohttp.get(`${this.urlapi}/buscarclientes`)
      this.res.subscribe((data:any[])=>{
      this.contenido = data
      console.log(this.contenido)
    })
  }

  consultarClientes(){
    this.clientes = 1
  }
  consultarVentas(){
    this.clientes = 0
  }

}
