import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon-service.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  navigation: string = '';
  idPkmn: any = null;
  lsPokemons: any = [];
  totalPkmns: number = 0;
  params: any = { idAuthor: 1 };
  perPage = 3;
  regex = new RegExp("^[0-9]+$");
  isEditing: boolean = false;

  pokemon: any = {
    name: null,
    image: null,
    attack: null,
    defense: null
  }
  constructor(
    private pkmnService: PokemonService
  ) { }

  ngOnInit(): void {
    this.buscarPokemons();
  }

  buscarPokemons() {
    this.lsPokemons = [];
    if (this.idPkmn) {
      this.pkmnService.getPokemonById(this.idPkmn).subscribe(
        (res: any) => {
          this.lsPokemons.push(res);
          this.totalPkmns = this.lsPokemons.length;
          this.isEditing=true;
          this.pokemon=res;
        })
    }
    else {
      this.pkmnService.getPokemons(this.params).subscribe((res: any) => {
        this.lsPokemons = res;
        this.totalPkmns = res.length;
      })
    }

  }

  editar(id: string) {
    this.isEditing = true;
    this.pkmnService.getPokemonById(id).subscribe((res: any) => {
      this.pokemon = res;
      console.log(this.pokemon)
    })

  }

  crearPkmn() {
    this.isEditing = false;
    this.resetPokemon();
  }

  borrar(id: number) {
    console.log(id);
  }

  crear(){
    let newPkmn={
      ...this.pokemon, 
      hp:this.pokemon.defense*3,
      type:"Electric",
      idAuthor:1
    }
    console.log('resp this.pokemon', newPkmn);
    this.pkmnService.createPokemon(newPkmn)
      .subscribe({
        next: (res:any)=>{
          console.log('resp created', res);
          this.resetPokemon();
        },
        error: (error)=>{
          console.log("Error ",error)
        }  

      }
      
      )
  }

  validaDigito(event: any) {
    console.log('evento accionado',event)
    if (event.charCode == 13) {
      this.buscarPokemons();
    }


    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!this.regex.test(key)) {
      event.preventDefault();
      return false;
    }
    else return true;
  }

  isNil(object: any) {
    if (object == null || object == "" || undefined)
      return true;

    else return false;
  }

  resetPokemon() {
    this.pokemon = {
      name: null,
      image: null,
      attack: null,
      defense: null
    }
  }
}
