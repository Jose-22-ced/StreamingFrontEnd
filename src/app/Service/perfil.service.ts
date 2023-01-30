import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Persona} from "../Entity/persona";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Perfil} from "../Entity/perfil";
import {Plan} from "../Entity/plan";

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) {}

  postPerfil(perfil:Perfil): Observable<Perfil> {
    return this.http.post(environment.URL_APP+"/perfil/save",perfil);
  }

  getPerfilById(id?:Number):Observable<Perfil>{
    return this.http.get(environment.URL_APP+"/perfil/getById/"+id);
  }

  deletePerfil(id?:Number):Observable<Perfil>{
    return this.http.delete(environment.URL_APP + "/perfil/deleteById/"+id);
  }
}
