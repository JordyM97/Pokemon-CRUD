import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CrearPokemonComponent } from './crear-pokemon.component';

describe('CrearPokemonComponent', () => {
  let component: CrearPokemonComponent;
  let fixture: ComponentFixture<CrearPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ CrearPokemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(' Method sendPostPokemon() called ', ()=>{
    it('should return a new pokemon ',()=>{
      spyOn(component.pkmnService, 'createPokemon' ).and.returnValue(of({ pokemon: {}}));
      component.sendPostPokemon();
      expect(component.error).toBeFalsy;
      expect(component.reset).toHaveBeenCalled;
      
    })
    it('should handle error',()=>{
      spyOn(component.pkmnService, 'createPokemon' ).and.returnValue(throwError(()=> Error('Error in API Call') ) );
      component.sendPostPokemon();
      expect(component.error).toBeTruthy;
    })
  })

  describe(' Method reset() called ', ()=>{
    it('should handle the reset of the form ',()=>{
      expect(component.pokemonForm.invalid).toBeTruthy
    })
  })

});
