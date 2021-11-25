import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  listaP = ["Código","Nit Proveedor","Nombre","Precio Compra","Iva Compra","Precio Venta"]
  producto:string = ""
  codigo:string = ""
  nit:string=""
  nombre:string = ""
  precioC: any
  ivaC: any
  precioV: any
  res:any;
  contenido:any;
  keys:any;
  values:any
  urlapi:string = "http://localhost:8080/productos/productos"
  editar:boolean = false

  constructor(private objetohttp:HttpClient) { }

  ngOnInit(): void {
    this.res = this.objetohttp.get(this.urlapi)
    this.res.subscribe((data:any[])=>{
      this.contenido = data
      console.log(this.contenido)
    })

  }

  reload(){
    location.reload()
  }
  
  eliminarTodo(event: Event){
    event.preventDefault()
    this.objetohttp.delete(`${this.urlapi}/delete`).subscribe((res)=>{
      console.log(res)
      this.reload()
    })
  }

  obtenerProducto(id: string){
    this.editar = true
    
    this.res = this.objetohttp.get(`${this.urlapi}/${id}`)
    this.res.subscribe( (data: string[]) =>{
      this.contenido = data
      this.producto = this.contenido[0].id
    })
  }

  editarProducto(){
    this.res = this.objetohttp.put(`${this.urlapi}/${this.producto}`,{
      codigo: this.codigo,
      nit: this.nit,
      nombre: this.nombre,
      precioCompra: this.precioC,
      ivaCompra: this.ivaC,
      precioVenta: this.precioV
    }).subscribe( (data: any) =>{
      console.log(data)
      this.reload()
    })
  }

  cancelarEdit(){
    this.editar = false
    this.res = this.objetohttp.get(this.urlapi)
    this.res.subscribe((data:any[])=>{
      this.contenido = data
    })
  }

  guardarProducto(){
    this.res = this.objetohttp.post(this.urlapi,{
      codigo: this.codigo,
      nit: this.nit,
      nombre: this.nombre,
      precioCompra: this.precioC,
      ivaCompra: this.ivaC,
      precioVenta: this.precioV
    }).subscribe((data: any)=>{
      console.log(data)
    })
    this.reload()
  }

  fileUpload($event:any){
    let file = $event.srcElement.files.item(0)

    let reader: FileReader = new FileReader();
       reader.readAsText(file);
       reader.onload = (e) => {
          let csv:string = reader.result as string;
          
          let json = this.csvJSON(csv)
          let data = JSON.parse(json)

          for(var item = 0; item < data.length; item++){
            this.objetohttp.post(this.urlapi,data[item]).subscribe((data: any)=>{
              console.log(data)
            })
          }
       }
  }

  public csvJSON(csv:String) {

    var lines = csv.split(/\r\n|\n/);
    var result = [];
    var headers = lines[0].split(";");
    for (var i = 1; i < lines.length; i++) {
        var obj:any = {};
        var currentline = lines[i].split(";");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }

    return JSON.stringify(result);
  }
}
