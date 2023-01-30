import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MaterialModule} from "../material/material.module";
import {InicialComponent} from './Components/inicial/inicial.component';
import {IniciosesionComponent} from './Components/iniciosesion/iniciosesion.component';
import {RouterModule, Routes} from "@angular/router";
import {SubscribeComponent} from './Components/subscribe/subscribe.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { PerfilComponent } from './Components/perfil/perfil.component';
import {PerfilSelectComponent} from "./Components/perfil-select/perfil-select.component";
import { PanelComponent } from './Components/panel/panel.component';
import { AjustesComponent } from './Components/ajustes/ajustes.component';
import { ReporteComponent } from './Components/reporte/reporte.component';


const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: "full", component: InicialComponent},
  {path: 'suscribirse', component: SubscribeComponent},
  {path: 'iniciosesion', component: IniciosesionComponent},
  {path: 'perfil-select/perfil', component: PerfilComponent},
  {path: 'perfil-select', component: PerfilSelectComponent},
  {path: 'panel', component: PanelComponent},
  {path: 'ajustes', component: AjustesComponent},
  {path: 'informes', component: ReporteComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    InicialComponent,
    IniciosesionComponent,
    SubscribeComponent,
    PerfilComponent,
    PerfilSelectComponent,
    PanelComponent,
    AjustesComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    [RouterModule.forRoot(routes, {useHash: false})],
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
