import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlanService} from "../../Service/plan.service";
import {PersonaService} from "../../Service/persona.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Persona} from "../../Entity/persona";
import {PerfilService} from "../../Service/perfil.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{
  hide = true;
  persona:Persona = new Persona();
  constructor(private planService:PlanService,
              private personaService:PersonaService,
              private _snackBar: MatSnackBar,
              private router:Router,
              private perfilService:PerfilService) {
  }
  ngOnInit(): void {
    this.persona=JSON.parse(sessionStorage['personausuario']);
  }
  formGroup = new FormGroup({
    // @ts-ignore
    idperfil : new FormControl<Number>(undefined),
    nombre : new FormControl<String>("", Validators.required),
    tipo : new FormControl<String>("",Validators.required),
    fech_cre : new FormControl<Date>(new Date()),
    fech_mod : new FormControl<Date>(new Date()),
    usua_creo : new FormControl<String>("ADMIN"),
    usua_mod : new FormControl<String>(""),
    // @ts-ignore
    idpersona : new FormControl<Number>(undefined),
  })

  guardarPerfil(){
    // @ts-ignore
    this.perfilService.postPerfil(this.formGroup.getRawValue()).subscribe(value => {
      this._snackBar.open('Perfil creado', '', {
        duration: 100
      });
      this.router.navigate(['perfil-select']);
    },error => {
      this._snackBar.open(error.error.message, '', {
        duration: 3000
      });
    })
  }

  cancelar() {
    this.router.navigate(['perfil-select']);
  }
}
