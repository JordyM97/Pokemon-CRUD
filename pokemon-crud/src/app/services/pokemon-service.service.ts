import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private apiService: ApiService) { }


  getPokemonById(id: string) {
    return this.apiService.apiCall(`${id}`, 'GET', null);
  }

  getPokemonByQty(qty: string, params: any) {
    return this.apiService.apiCall(`${qty}`, 'GET', params);
  }

  getPokemons(params: any) {
    return this.apiService.apiCall(``, 'GET', params);
  }

  createPokemon(data: any) {
    return this.apiService.apiCall(``, 'POST', data);
  }

  updatePokemon(id: string, data: any) {
    return this.apiService.apiCall(`${id}`, 'PUT', data);
  }

  deletePokemon(id: string) {
    return this.apiService.apiCall(`${id}`, 'DELETE', null);
  }
  
} 
