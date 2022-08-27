import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPokemonComponent } from './components/crear-pokemon/crear-pokemon.component';
import { PrincipalComponent } from './pages/principal/principal.component';

const routes: Routes = [
    { path: ' ', redirectTo: 'principal'},
    { path: 'principal', component: PrincipalComponent },
    { path: 'nuevo-pokemon', component: CrearPokemonComponent },
    { path: '**', redirectTo: 'principal' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
