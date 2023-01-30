import {Component, OnInit} from '@angular/core';
import {PlanService} from "../../Service/plan.service";
import {PersonaService} from "../../Service/persona.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent implements OnInit{
  hide = true;
  constructor(private planService:PlanService,
              private personaService:PersonaService,
              private _snackBar: MatSnackBar,
              private router:Router) {
  }

  ngOnInit(): void {
  }

  formGroup = new FormGroup({
    correo : new FormControl<String>("", [Validators.required, Validators.email]),
    clave : new FormControl<String>("",Validators.required)
  })

  inicarSesion(){
    // @ts-ignore
    this.personaService.signUp(this.formGroup.getRawValue()).subscribe(value => {
      this._snackBar.open('Saludos', '', {
        duration: 1000
      });
      sessionStorage.clear()
      sessionStorage.setItem('personausuario', JSON.stringify(value));
      this.router.navigate(['/perfil-select']);
    },error => {
      this._snackBar.open(error.error.message, '', {
        duration: 3000
      });
    })
  }

  suscribirse(){
    this.router.navigate(['/suscribirse']);
  }
}
