import {Component, OnInit} from '@angular/core';
import {Perfil} from "../../Entity/perfil";
import {PerfilService} from "../../Service/perfil.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanService} from "../../Service/plan.service";
import {PersonaService} from "../../Service/persona.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit{

  media?: String;

  perfil:Perfil = new Perfil();
  constructor(private perfilService:PerfilService,
              private activatedRoute: ActivatedRoute,
              private planService:PlanService,
              private personaService:PersonaService,
              private _snackBar: MatSnackBar,
              private router:Router) {
  }

  ngOnInit(): void {
    this.media="1"
    this.perfil = JSON.parse(sessionStorage['perfilusuario']);
    this.perfilService.getPerfilById(this.perfil.idperfil).subscribe(value => {
      this.perfil=value;
    })
  }


  ajustesusuario(){
    this.personaService.getPersonaById(this.perfil.persona?.idpersona).subscribe(value => {
      sessionStorage.setItem('personausuario', JSON.stringify(value));
      this.router.navigate(['ajustes']);
    })
  }

  cambiardeperfil(){
    this.personaService.getPersonaById(this.perfil.persona?.idpersona).subscribe(value => {
      sessionStorage.setItem('personausuario', JSON.stringify(value));
      this.router.navigate(['perfil-select']);
    })
  }
  cerrarSesion(){
    this.router.navigate(['']);
    sessionStorage.clear()
    sessionStorage.setItem('personausuario', JSON.stringify(null));
    sessionStorage.setItem('perfilusuario', JSON.stringify(null));
  }


  pelicula(){
    this.media = "1"
  }
  serie(){
    this.media = "2"
  }
}
