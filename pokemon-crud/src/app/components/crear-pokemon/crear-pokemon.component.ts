import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon-service.service';

@Component({
  selector: 'app-crear-pokemon',
  templateUrl: './crear-pokemon.component.html',
  styleUrls: ['./crear-pokemon.component.scss']
})
export class CrearPokemonComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  
  pokemonForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    attack: new FormControl('', Validators.required),
    defense: new FormControl('', Validators.required),
    hp: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    idAuthor:new FormControl('1',),
  });
  atk:any=0;
  def:any=0;
  lifePoints:any=0;
  error:boolean=false;
  isEditing:boolean=false;
  constructor(public pkmnService: PokemonService) { }

  ngOnInit(): void {
    
  }
  
  sendPostPokemon() {
    this.pkmnService.createPokemon(this.pokemonForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          console.log('resp created', res);
          this.error = false;
          this.reset();
        },
        error: (error) => {
          console.log("Error ", error);
          this.error = true;
        }
      }
      )
  }


  reset() {
    this.pokemonForm.reset();
  }
}
