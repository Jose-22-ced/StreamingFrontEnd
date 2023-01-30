import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Plan} from "../Entity/plan";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) {}

  getAllPlan(): Observable<Plan[]> {
    return this.http.get(environment.URL_APP + "/plan/getAll").pipe(map(Response => Response as Plan[]))
  }


}
