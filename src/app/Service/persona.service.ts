import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Plan} from "../Entity/plan";
import {environment} from "../../environments/environment";
import {Persona} from "../Entity/persona";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) {}

  signUp(persona:Persona): Observable<Persona> {
    return this.http.post(environment.URL_APP+"/persona/signup",persona);
  }
  getPersonaById(id?:Number): Observable<Persona> {
    return this.http.get(environment.URL_APP+"/persona/getById/"+id);
  }

  getPersonaAll(): Observable<Persona[]> {
    return this.http.get(environment.URL_APP+"/persona/getAll").pipe(map(Response => Response as Persona[]));
  }
  postPerson(persona:Persona): Observable<Persona> {
    return this.http.post(environment.URL_APP+"/persona/save",persona);
  }

  putPerson(persona:Persona): Observable<Persona> {
    return this.http.put(environment.URL_APP+"/persona/update",persona);
  }
}
