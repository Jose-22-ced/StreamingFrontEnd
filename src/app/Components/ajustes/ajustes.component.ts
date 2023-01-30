import {Component, OnInit} from '@angular/core';
import {Perfil} from "../../Entity/perfil";
import {PerfilService} from "../../Service/perfil.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanService} from "../../Service/plan.service";
import {PersonaService} from "../../Service/persona.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Plan} from "../../Entity/plan";

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit{
  hide = true;
  edituser = true;
  panelOpenState = false;
  perfil:Perfil = new Perfil();

  listaPlan:Plan[]=[];
  constructor(private perfilService:PerfilService,
              private activatedRoute: ActivatedRoute,
              private planService:PlanService,
              private personaService:PersonaService,
              private _snackBar: MatSnackBar,
              private router:Router) {
  }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(){
    this.perfil = JSON.parse(sessionStorage['perfilusuario']);
    this.perfilService.getPerfilById(this.perfil.idperfil).subscribe(value => {
      this.perfil=value;
      this.personaService.getPersonaById(this.perfil.persona?.idpersona).subscribe(value1 => {
        this.formGroup.setValue({
          clave: value1.clave,
          correo: value1.correo,
          fech_cre: value1.fech_cre,
          fech_mod: new Date(),
          idpersona: value1.idpersona,
          idplan: value1.plan?.idplan,
          usua_creo: value1.usua_creo,
          usua_mod: "ADMIN"
        })
        this.formGroup1.setValue({
          clave: value1.clave,
          correo: value1.correo,
          fech_cre: value1.fech_cre,
          fech_mod: new Date(),
          idpersona: value1.idpersona,
          idplan: value1.plan?.idplan,
          usua_creo: value1.usua_creo,
          usua_mod: "ADMIN"
        })
      })
    })
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

  formGroup = new FormGroup({
    idpersona : new FormControl<Number|undefined>(undefined),
    correo : new FormControl<String|undefined>("", [Validators.required, Validators.email]),
    clave : new FormControl<String|undefined>("",Validators.required),
    fech_cre : new FormControl<Date|undefined>(undefined),
    fech_mod : new FormControl<Date|undefined>(undefined),
    usua_creo : new FormControl<String|undefined>(""),
    usua_mod : new FormControl<String|undefined>(""),
    idplan : new FormControl<Number|undefined>(undefined,Validators.required),
  })

  formGroup1 = new FormGroup({
    idpersona : new FormControl<Number|undefined>(undefined),
    correo : new FormControl<String|undefined>("", [Validators.required, Validators.email]),
    clave : new FormControl<String|undefined>("",Validators.required),
    fech_cre : new FormControl<Date|undefined>(undefined),
    fech_mod : new FormControl<Date|undefined>(undefined),
    usua_creo : new FormControl<String|undefined>(""),
    usua_mod : new FormControl<String|undefined>(""),
    idplan : new FormControl<Number|undefined>(undefined,Validators.required),
  })

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


  guardarUsuario(){
    // @ts-ignore
    this.personaService.putPerson(this.formGroup.getRawValue()).subscribe(value => {
      this._snackBar.open('Datos actailizados', '', {
        duration: 1000
      });
      this.edituser = true;
      this.cargar();
    },error => {
      this._snackBar.open(error.error.message, '', {
        duration: 3000
      });
    })
  }

  guardarPlan(){
    // @ts-ignore
    this.personaService.putPerson(this.formGroup1.getRawValue()).subscribe(value => {
      this._snackBar.open('Plan actualizado. Se relizaron cambios en sus perfíles', '', {
        duration: 1000
      });
      this.router.navigate(['perfil-select']);
    },error => {
      this._snackBar.open(error.error.message, '', {
        duration: 3000
      });
    })
  }

  salirAjustes(){
    this.router.navigate(['perfil-select']);
  }


  cerrarSesion(){
    this.router.navigate(['']);
    sessionStorage.clear()
    sessionStorage.setItem('personausuario', JSON.stringify(null));
    sessionStorage.setItem('perfilusuario', JSON.stringify(null));
  }

}
