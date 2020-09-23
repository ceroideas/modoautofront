import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DetailsComponent } from './pages/details/details.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReplacementsComponent } from './pages/replacements/replacements.component';
import { ReplacementComponent } from './pages/replacement/replacement.component';

import { McyclesComponent } from './pages/mcycles/mcycles.component';
import { McycleComponent } from './pages/mcycle/mcycle.component';

import { IndustrialsComponent } from './pages/industrials/industrials.component';
import { IndustrialComponent } from './pages/industrial/industrial.component';

import { MyAccountComponent } from './pages/my-account/my-account.component';
import { MyPublishingComponent } from './pages/my-publishing/my-publishing.component';

import { PublishComponent } from './pages/publish/publish.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

import { VansComponent } from './pages/vans/vans.component';
import { VanDetailsComponent } from './pages/van-details/van-details.component';
import { ProfessionalsComponent } from './pages/professionals/professionals.component';

import { FaqsComponent } from './pages/faqs/faqs.component';
import { SearchesComponent } from './pages/searches/searches.component';
import { MessagesComponent } from './pages/messages/messages.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'furgonetas', component: VansComponent },
  { path: 'furgonetas/:id', component: VanDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'detalles', component: DetailsComponent }, // borrar luego
  { path: 'detalles/:id', component: DetailsComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'repuestos', component: ReplacementsComponent },
  { path: 'repuesto/:id', component: ReplacementComponent },
  { path: 'motos', component: McyclesComponent }, // borrar luego
  { path: 'motos/:id', component: McycleComponent },
  { path: 'industriales', component: IndustrialsComponent }, // borrar luego
  { path: 'industriales/:id', component: IndustrialComponent },
  { path: 'mi-perfil', component: MyAccountComponent },
  { path: 'mis-anuncios', component: MyPublishingComponent },
  { path: 'publicar', component: PublishComponent },
  { path: 'favoritos', component: FavoritesComponent },
  { path: 'profesionales', component: ProfessionalsComponent },

  { path: 'profesionales/:id/Coches', component: HomeComponent },
  { path: 'profesionales/:id/Repuestos', component: ReplacementsComponent },

  { path: 'editar/:id/:categoria', component: PublishComponent },
  { path: 'informacion', component: FaqsComponent },
  { path: 'ayuda', component: FaqsComponent },
  { path: 'busquedas', component: SearchesComponent },
  { path: 'mi-perfil/mensajes', component: MessagesComponent },

  { path: 'busquedas/Coches/:filter', component: HomeComponent },
  { path: 'busquedas/Repuestos/:filter', component: ReplacementsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
