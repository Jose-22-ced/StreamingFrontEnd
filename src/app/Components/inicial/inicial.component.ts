import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit{

  constructor(private router:Router) {
  }
  ngOnInit(): void {
    setTimeout(()=>{
      this.router.navigate(['/suscribirse']);
    },5000)
  }

}