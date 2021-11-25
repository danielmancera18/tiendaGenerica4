import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userC:string = "admininicial"
  passC:string = "admin123456"
  user:string = ""
  pass:string = ""
  validado:number = -1
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  validar(){
    if(this.user === this.userC){
      this.validado = 1
      if(this.pass === this.passC){
        this.validado = 1
        setTimeout(()=>{
          this.router.navigate(['/productos']);
        },1500)
      }else{
        this.validado = 0
        setTimeout(()=>{
          this.validado = -1 
        },4000)
      }
    }else{
      this.validado = 0
      setTimeout(()=>{
        this.validado = -1 
      },4000)
    }
  }

  reload(){
    location.reload()
  }

}
