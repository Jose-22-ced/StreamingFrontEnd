import {Component, OnInit} from '@angular/core';
import {PersonaService} from "../../Service/persona.service";
import {Persona} from "../../Entity/persona";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit{
  panelOpenState = false;

  personas:Persona[]=[];
  constructor(private personaService:PersonaService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.personaService.getPersonaAll().subscribe(value => {
      this.personas = value;
    })
  }

  salir(){
    this.router.navigate(['']);
  }
}
