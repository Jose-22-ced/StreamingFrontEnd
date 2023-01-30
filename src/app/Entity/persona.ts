import {Plan} from "./plan";
import {Perfil} from "./perfil";

export class Persona {
  idpersona?: Number;
  correo?: String;
  clave?: String;
  fech_cre?: Date;
  fech_mod?:  Date;
  usua_creo?: String
  usua_mod?: String
  idplan?: Number;
  plan?: Plan;
  perfils?: Perfil[]
}
