import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CrearPokemonComponent } from 'src/app/components/crear-pokemon/crear-pokemon.component';
import { PokemonService } from 'src/app/services/pokemon-service.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  idPkmn: any = null;
  lsPokemons: Array<any> = [];
  totalPkmns: number = 0;
  params: any = { idAuthor: 1 };
  perPage = 3;
  regex = new RegExp("^[0-9]+$");
  isEditing: boolean = false;
  error: boolean = false;
  pokemonSelected:any=null;
  pokemon: any = {
    name: null,
    image: null,
    attack: null,
    defense: null
  }

  
  constructor(
    public pkmnService: PokemonService
  ) { }

  ngOnInit(): void {
    this.buscarPokemons();
  }

  buscarPokemons() {
    this.lsPokemons.length = 0;
    if (this.idPkmn) {
      this.pkmnService.getPokemonById(this.idPkmn)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          {
            next: (res: any) => {
              this.error = false;
              this.lsPokemons.push(res);
              this.totalPkmns = this.lsPokemons.length;
              this.isEditing = true;
              this.pokemon = res;
            }
            ,
            error: (err) => {
              this.error = true;
              console.log(err)
            }

          }
        )
    }
    else {
      this.pkmnService.getPokemons(this.params)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          {
            next: (res: any) => {
              this.error = false;
              this.lsPokemons = res;
              this.totalPkmns = res.length;
            },
            error: (err) => {
              console.log(err);
              this.lsPokemons.length=0;
              this.error = true;
            }
          }
        )
    }

  }

  btn_editar(id: string) {
    this.isEditing = true;
    this.pokemonSelected=id;
    this.pkmnService.getPokemonById(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        {
          next: (res: any) => {
            this.pokemon = res;
            this.error=false;
            console.log(this.pokemon);
          },
          error: (err)=>{
            this.error=true;
          }
        }
      )

}

resetOpciones() {
  this.isEditing = false;
  this.resetPokemon();
}

sendPostPokemon() {
  let newPkmn = {
    ...this.pokemon,
    hp: this.pokemon.defense * 3,
    type: "Electric",
    idAuthor: 1
  }
  console.log('resp this.pokemon', newPkmn);
  this.pkmnService.createPokemon(newPkmn)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (res: any) => {
        console.log('resp created', res);
        this.error=false;
        this.resetPokemon();
      },
      error: (error) => {
        console.log("Error ", error);
        this.error=true;
      }
    }
    )
}

sendPutPokemon() {
  let newPkmn = {
    ...this.pokemon,
    idAuthor: 1
  }
  console.log('resp this.pokemon', newPkmn);
  this.pkmnService.updatePokemon(newPkmn.id,newPkmn)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (res: any) => {
        console.log('resp updated', res);
        this.error=false;
        this.resetPokemon();
        this.idPkmn=null;
        this.buscarPokemons();
      },
      error: (error) => {
        console.log("Error ", error);
        this.error=true;
      }
    }
    )
}

btn_borrar(id: string) {
  this.pkmnService.deletePokemon(id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (res: any) => {
        console.log('resp deleted', res);
        this.error=false;
        this.buscarPokemons();
      },
      error: (error) => {
        console.log("Error ", error);
        this.error=true;
      }
    }
    )
}

ngOnDestroy() {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}

resetPokemon() {
  this.pokemon = {
    name: null,
    image: null,
    attack: null,
    defense: null
  }
}
validaEnter(event:any){
  if (event.charCode != 13) this.buscarPokemons();
}
validaDigito(event: any) {
  console.log(event)
  if (event.charCode == 13) this.buscarPokemons();

  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if(!this.regex.test(key)) {
    //event.preventDefault();
    return false;
  }
  return true;
}

}
