import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  res:any;
  cliente: any;
  producto1:any;
  producto2:any;
  producto3:any;

  cedula:string = "";
  userName:string = "";
  userEmail:string = "";

  codigo1:string = "";
  nombre1:string = "";
  precioVenta1:string = "0";
  cantidad1:number = 0;

  codigo2!:string;
  nombre2:string = "";
  precioVenta2:string = "0";
  cantidad2:number = 0;

  codigo3!:string;
  nombre3:string = "";
  precioVenta3:string = "0";
  cantidad3:number = 0;
  
  totalventa:number = 0;
  totaliva:number = 0;
  total:number = 0;

  confirmar:boolean = false;
  total1:boolean = false;

  cantidadTotal:number = 0;
  
  urlapi2:string = "http://localhost:8080/productos"
  urlapi:string = "http://localhost:8081/clientes"
  urlapi3:string = "http://localhost:8082/ventas"
  

  constructor(private objetohttp:HttpClient) { }

  ngOnInit(): void {
  }

  obtenerCliente(cedula:string){
    this.res = this.objetohttp.get(`${this.urlapi}/buscarclientes/${cedula}`)
    this.res.subscribe( (data: string[]) =>{
      this.cliente = data
      if(this.cliente != null){
        this.userName = this.cliente[0].nombreCompleto
        this.userEmail = this.cliente[0].correoElectronico
      }else{
        alert("El cliente no existe")
        this.cedula = ""
        this.userName = ""
        this.userEmail = ""
      }
      
    })
  }

  consultarProducto1(codigo:string){
    this.res = this.objetohttp.get(`${this.urlapi2}/productos/${codigo}`)
    this.res.subscribe( (data: string[]) =>{
      this.producto1 = data
      if(this.producto1 != null){
        this.nombre1 = this.producto1[0].nombre
        this.precioVenta1 = this.producto1[0].precioVenta
        this.cantidad1 = 1;
      }else{
        alert("El producto no existe")
        this.codigo1 = ""
        this.nombre1 = ""
        this.precioVenta1 = "0"
        this.cantidad1 = 0;
      }
    })
  }
  consultarProducto2(codigo:string){
    this.res = this.objetohttp.get(`${this.urlapi2}/productos/${codigo}`)
    this.res.subscribe( (data: string[]) =>{
      this.producto2 = data
      if(this.producto2 != null){
        this.nombre2 = this.producto2[0].nombre
        this.precioVenta2 = this.producto2[0].precioVenta
        this.cantidad2 = 1
      }else{
        alert("El producto no existe")
        this.codigo2 = ""
        this.nombre2 = ""
        this.precioVenta2 = "0"
        this.cantidad2 = 0;
      }
    })
  }
  consultarProducto3(codigo:string){
    this.res = this.objetohttp.get(`${this.urlapi2}/productos/${codigo}`)
    this.res.subscribe( (data: string[]) =>{
      this.producto3 = data
      if(this.producto3 != null){
        this.nombre3 = this.producto3[0].nombre
        this.precioVenta3 = this.producto3[0].precioVenta
        this.cantidad3 = 1
        this.total1 = true
      }else{
        alert("El producto no existe")
        this.codigo3 = ""
        this.nombre3 = ""
        this.precioVenta3 = "0"
        this.cantidad3 = 0;
        this.total1 = false
      }
    })
  }

  totalizar(){
    if(this.cedula === ""){
      alert("Hace falta el cliente")
      this.confirmar = false
    }else{
      this.confirmar = true
    }
    let precio1 = parseInt(this.precioVenta1);
    let precio2 = parseInt(this.precioVenta2);
    let precio3 = parseInt(this.precioVenta3);

    let iva1 = (parseInt(this.producto1[0].ivaCompra)/100);
    let iva2 = (parseInt(this.producto2[0].ivaCompra)/100);
    let iva3 = (parseInt(this.producto3[0].ivaCompra)/100);

    this.totalventa = precio1 + precio2 + precio3
    this.totaliva = Math.round((precio1*iva1) + (precio2*iva2) + (precio3*iva3))

    this.cantidadTotal = this.cantidad1 + this.cantidad2 + this.cantidad3;

    this.total = this.totalventa + this.totaliva
    console.log(this.confirmar)
  }

  crearVenta(){
    if(this.cedula === ""){
      alert("Hay campos vacios")
    }else{
      this.res = this.objetohttp.post(`${this.urlapi3}/crearventa`,{
        cedula: this.cedula,
        nombre: this.userName,
        cantidad: this.cantidadTotal,
        totalVenta: this.totalventa,
        totalIva: this.totaliva,
        total: this.total,
      }).subscribe((data: any)=>{
        console.log(data)
      })
      setTimeout(()=>{
        alert("La venta fue creada")
        location.reload()
      },1000)
    }
  }
}
