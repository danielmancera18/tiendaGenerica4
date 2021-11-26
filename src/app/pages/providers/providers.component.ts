import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {


  listaP = ["Nit","Nombre Proveedor","Dirección","Télefono","Ciudad"]

  res:any;
  contenido:any;
  urlapi:string = "http://localhost:8081/proveedores"

  nit!:string;
  nitP!:string;
  nombre!:string;
  direccion!:string;
  telefono!:string;
  ciudad!:string;
  proveedor!:string;

  editar:boolean = false
  constructor(private objetohttp:HttpClient) { }

  ngOnInit(): void {
    this.res = this.objetohttp.get(`${this.urlapi}/buscarproveedores`)
    this.res.subscribe((data:any[])=>{
      this.contenido = data
      console.log(this.contenido)
    })
  }

  crearProveedor(){
    this.res = this.objetohttp.post(`${this.urlapi}/crearproveedor`,{
      nit: this.nit,
      nombre: this.nombre,
      direccion: this.direccion,
      telefono: this.telefono,
      ciudad: this.ciudad
    }).subscribe((data: any)=>{
      console.log(data)
    })
    this.reload()
  }

  editarProveedor(nit:string){
    this.editar = true
    this.obtenerProveedor(nit)
  }

  Editar(){
    this.res = this.objetohttp.put(`${this.urlapi}/editarproveedor/${this.proveedor}`,{
      nit: this.nit,
      nombre: this.nombre,
      direccion: this.direccion,
      telefono: this.telefono,
      ciudad: this.ciudad
    }).subscribe( (data: any) =>{
      console.log(data)
      this.reload()
    })
  }

  eliminarProveedor(id:string){
    this.objetohttp.delete(`${this.urlapi}/delete/${id}`).subscribe(()=>{
      this.reload()
    })
    
  }

  eliminarProveedores(event:Event){
    event.preventDefault()
    this.objetohttp.delete(`${this.urlapi}/delete`).subscribe((res)=>{
      console.log(res)
      this.reload()
    })
  }

  obtenerProveedor(nit:string){
    this.res = this.objetohttp.get(`${this.urlapi}/buscarproveedores/${nit}`)
    this.res.subscribe( (data: string[]) =>{
      this.contenido = data
      this.proveedor = this.contenido[0].id
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

