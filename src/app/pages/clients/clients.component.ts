import { HttpClient } from '@angular/common/http';
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
  urlapi:string = "http://localhost:8081/clientes"

  cedula!:string;
  cedulaC!:string;
  nombre!:string;
  direccion!:string;
  telefono!:string;
  correo!:string;
  cliente!:string;

  editar:boolean = false
  constructor(private objetohttp:HttpClient) { }

  ngOnInit(): void {
    this.res = this.objetohttp.get(`${this.urlapi}/buscarclientes`)
    this.res.subscribe((data:any[])=>{
      this.contenido = data
      console.log(this.contenido)
    })
  }

  crearCliente(){
    this.res = this.objetohttp.post(`${this.urlapi}/crearcliente`,{
      cedula: this.cedula,
      nombreCompleto: this.nombre,
      direccion: this.direccion,
      telefono: this.telefono,
      correoElectronico: this.correo
    }).subscribe((data: any)=>{
      console.log(data)
    })
    this.reload()
  }

  editarCliente(cedula:string){
    this.editar = true
    this.obtenerCliente(cedula)
  }
  Editar(){
    this.res = this.objetohttp.put(`${this.urlapi}/editarcliente/${this.cliente}`,{
      cedula: this.cedula,
      nombreCompleto: this.nombre,
      direccion: this.direccion,
      telefono: this.telefono,
      correoElectronico: this.correo
    }).subscribe( (data: any) =>{
      console.log(data)
      this.reload()
    })
  }

  eliminarCliente(id:string){
    this.objetohttp.delete(`${this.urlapi}/delete/${id}`).subscribe(()=>{
      this.reload()
    })
    
  }

  eliminarClientes(event:Event){
    event.preventDefault()
    this.objetohttp.delete(`${this.urlapi}/delete`).subscribe((res)=>{
      console.log(res)
      this.reload()
    })
  }

  obtenerCliente(cedula:string){
    this.res = this.objetohttp.get(`${this.urlapi}/buscarclientes/${cedula}`)
    this.res.subscribe( (data: string[]) =>{
      this.contenido = data
      this.cliente = this.contenido[0].id
    })
  }

  cancelarEdit(){
    this.editar = false
    this.reload()
  }

  reload(){
    location.reload()
  }
}
