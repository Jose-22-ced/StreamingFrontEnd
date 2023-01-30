import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlanService} from "../../Service/plan.service";
import {Plan} from "../../Entity/plan";
import {PersonaService} from "../../Service/persona.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit{
  hide = true;
  listaPlan:Plan[]=[];

  constructor(private planService:PlanService,
              private personaService:PersonaService,
              private _snackBar: MatSnackBar,
              private router:Router) {
  }
  ngOnInit(): void {
    this.planService.getAllPlan().subscribe(value => {
      this.listaPlan=value.sort((a, b) => {
        // @ts-ignore
        if (a.idplan > b.idplan) {
          return 1;
        }
        // @ts-ignore
        if (a.idplan < b.idplan) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    })
  }
  // @ts-ignore
  formGroup = new FormGroup({
    idpersona : new FormControl<Number|undefined>(undefined),
    correo : new FormControl<String|undefined>("", [Validators.required, Validators.email]),
    clave : new FormControl<String|undefined>("",Validators.required),
    fech_cre : new FormControl<Date|undefined>(new Date()),
    fech_mod : new FormControl<Date|undefined>(new Date()),
    usua_creo : new FormControl<String|undefined>("ADMIN"),
    usua_mod : new FormControl<String|undefined>(""),
    idplan : new FormControl<Number|undefined>(undefined,Validators.required),
  })

  guardarUsuario(){
    // @ts-ignore
    this.personaService.postPerson(this.formGroup.getRawValue()).subscribe(value => {
      this._snackBar.open('Registrado, Bienvenido', '', {
        duration: 1000
      });
      this.router.navigate(['/iniciosesion']);
    },error => {
      this._snackBar.open(error.error.message, '', {
        duration: 3000
      });
    })
  }

  inicarSesion(){
    this.router.navigate(['/iniciosesion']);
  }

  reportes(){
    this.router.navigate(['/informes']);
  }

}
