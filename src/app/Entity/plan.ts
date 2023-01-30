import {Persona} from "./persona";

export class Plan {
  idplan?:Number
  tipo?:String
  numpefil?:Number
  usua_creo?:String
  usua_mod?:String
  fech_cre?:Date
  fech_mod?:Date
  personas?:Persona[];
}
