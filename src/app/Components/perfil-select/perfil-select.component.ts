import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Perfil} from "../../Entity/perfil";
import {PersonaService} from "../../Service/persona.service";
import {Persona} from "../../Entity/persona";
import {PlanService} from "../../Service/plan.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PerfilService} from "../../Service/perfil.service";

@Component({
  selector: 'app-perfil-select',
  templateUrl: './perfil-select.component.html',
  styleUrls: ['./perfil-select.component.css']
})
export class PerfilSelectComponent implements OnInit{


  perfiles?:Perfil [] = [];
  persona:Persona = new Persona();

  constructor(private activatedRoute: ActivatedRoute,
              private planService:PlanService,
              private personaService:PersonaService,
              private _snackBar: MatSnackBar,
              private router:Router,
              private perfilService:PerfilService) {
  }
  ngOnInit(): void {
    this.listarPeriles();
  }

  listarPeriles(){
    this.persona=JSON.parse(sessionStorage['personausuario']);
    this.personaService.getPersonaById(this.persona.idpersona).subscribe(value => {
      this.perfiles = value.perfils;
      sessionStorage.setItem('personausuario', JSON.stringify(value));
      this.persona=JSON.parse(sessionStorage['personausuario']);
    })
  }

  nuevoperfil(){
    this.listarPeriles();
    // @ts-ignore
    if(this.persona.plan?.numpefil<=this.persona.perfils?.length){
      this._snackBar.open('Ya alcanzo el número maximo de perfiles según si plan.', '', {
        duration: 3000
      });
    }else {
      this.router.navigate(['perfil-select/perfil']);
    }
  }

  ingresarperfil(id?:Number){
    this.perfilService.getPerfilById(id).subscribe(value => {
      sessionStorage.setItem('perfilusuario', JSON.stringify(value));
      this.router.navigate(['panel']);
    })
  }

  eliminarperfil(id?:Number){
    this.perfilService.deletePerfil(id).subscribe(value => {
      this._snackBar.open('Perfil eliminado.', '', {
        duration: 3000
      });
      this.listarPeriles();
    },error => {
      this._snackBar.open(error.error.message, '', {
        duration: 3000
      });
      this.listarPeriles();
    })
  }


}
