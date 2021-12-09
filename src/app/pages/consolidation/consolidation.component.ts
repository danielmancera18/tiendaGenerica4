import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consolidation',
  templateUrl: './consolidation.component.html',
  styleUrls: ['./consolidation.component.css']
})
export class ConsolidationComponent implements OnInit {

  listaP = ["Ciudad","Valor total de ventas"]
  res:any;
  contenido:any
  ciudad:string = "Bogotá";
  total:number = 0;
  urlapi:string = "http://localhost:8082/ventas"


  constructor(private objetohttp:HttpClient) { }

  ngOnInit(): void {
    this.calcularVentas()
  }

  calcularVentas(){
    this.res = this.objetohttp.get(`${this.urlapi}/obtenerventas`)
      this.res.subscribe((data:any[])=>{
      this.contenido = data
      for(let venta of this.contenido){
        let number = parseInt(venta.total)
        this.total += number
      }
    });
  }
}
