import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PrincipalComponent } from './principal.component';

describe('PrincipalComponent', () => {
  let component: PrincipalComponent;
  let fixture: ComponentFixture<PrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ PrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //throwError( ()=> Error('Error') 

  describe(' Method buscarPokemons() called ', ()=>{
    it('should return a list of pokemons ',()=>{
      spyOn(component.pkmnService, 'getPokemons' ).and.returnValue(of({ lsPokemons: []}));
      component.buscarPokemons();
      expect(component.lsPokemons).toHaveSize(1);
      expect(component.error).toBeFalsy;
    })
    it('should handle error',()=>{
      spyOn(component.pkmnService, 'getPokemons' ).and.returnValue(throwError(()=> Error('Error in API Call') ) );
      component.buscarPokemons();
      expect(component.lsPokemons).toHaveSize(0);
      expect(component.totalPkmns).toBe(0);
      expect(component.error).toBeTruthy;
    })

    it('should return a pokemon list with one element when a idPkmn is sent',()=>{
      spyOn(component.pkmnService, 'getPokemonById' ).and.returnValue(of({ pokemon: {}}));
      component.buscarPokemons();
      expect(component.pokemon).toBeDefined();
      expect(component.error).toBeFalsy;
    })
    it('should handle error  when a idPkmn is sent',()=>{
      spyOn(component.pkmnService, 'getPokemonById' ).and.returnValue(throwError(()=> Error('Error in API Call') ) );
      component.buscarPokemons();
      expect(component.lsPokemons).toHaveSize(0);
      expect(component.totalPkmns).toBe(0);
      expect(component.error).toBeTruthy;
    })

    it('should handle if a idPkmn is sent',()=>{
      spyOn(component, 'buscarPokemons' ).and.callThrough();
      component.buscarPokemons();
      expect(component.idPkmn).toBeDefined();
    })
    it('should handle if a idPkmn is not sent',()=>{
      spyOn(component, 'buscarPokemons' ).and.callThrough();
      component.buscarPokemons();
      expect(component.idPkmn).toBeNull();
    })

  });

  describe(' Method sendPostPokemon() called ', ()=>{
    it('should return a new pokemon ',()=>{
      spyOn(component.pkmnService, 'createPokemon' ).and.returnValue(of({ pokemon: {}}));
      component.sendPostPokemon();
      expect(component.error).toBeFalsy;
      
    })
    it('should handle error',()=>{
      spyOn(component.pkmnService, 'createPokemon' ).and.returnValue(throwError(()=> Error('Error in API Call') ) );
      component.sendPostPokemon();
      expect(component.error).toBeTruthy;
    })
  })

  describe(' Method sendPutPokemon() called ', ()=>{
    it('should return the edited pokemon ',()=>{
      spyOn(component.pkmnService, 'updatePokemon' ).and.returnValue(of({ pokemon: {}}));
      component.sendPutPokemon();
      expect(component.error).toBeFalsy;
      
    })
    it('should handle error when editing a pokemon',()=>{
      spyOn(component.pkmnService, 'updatePokemon' ).and.returnValue(throwError(()=> Error('Error in API Call') ) );
      component.sendPutPokemon();
      expect(component.error).toBeTruthy;
    })
  })

  describe(' Method btn_borrar() called ', ()=>{
    it('should return a response for deleting a pokemon ',()=>{
      spyOn(component.pkmnService, 'deletePokemon' ).and.returnValue(of({ response: {}}));
      const id= '3788';
      component.btn_borrar(id);
      expect(component.error).toBeFalsy;
      expect(component.buscarPokemons).toHaveBeenCalled;
      
    })
    it('should handle error',()=>{
      spyOn(component.pkmnService, 'deletePokemon' ).and.returnValue(throwError(()=> Error('Error in API Call') ) );
      const id= '3788';
      component.btn_borrar(id);
      expect(component.error).toBeTruthy;
    })
  })

  describe(' Method btn_editar()) called ', ()=>{
    it('should handle  when an id is sent and response is ok',()=>{
      const id='3788';
      spyOn(component.pkmnService, 'getPokemonById' ).and.returnValue(of({ pokemon: {}}));
      component.btn_editar(id);
      expect(component.error).toBeFalsy;
      expect(component.pokemon.name).not.toBeNull()
    })

    it('should handle when an id is sent and response has errors',()=>{
      const id='3788';
      spyOn(component.pkmnService, 'getPokemonById' ).and.returnValue(throwError(()=> Error('Error in API Call') ) );
      component.btn_editar(id);
      expect(component.error).toBeTruthy;
      
    })
  });

  describe(' Method validaEnter()) called ', ()=>{
    it('should handle  when charCode is 13',()=>{
      const event={ charCode:13};
      spyOn(component, 'validaEnter' ).and.callThrough();
      component.validaEnter(event);
      expect(component.validaEnter).toBeTruthy;
      expect(component.buscarPokemons).toHaveBeenCalled;

    })

    it('should handle when charCode not equals 13',()=>{
      const event={ charCode:14};
      spyOn(component, 'validaEnter' ).and.callThrough();
      component.validaEnter(event);
      expect(component.validaEnter).toBeFalsy;
    })
  });


  describe(' Method resetPokemon()) called ', ()=>{
    it('should handle the reset of a pokemon variable',()=>{
      const pokemon= {
        name: null,
        image: null,
        attack: null,
        defense: null
      }
      spyOn(component, 'resetPokemon' ).and.callThrough();
      component.resetPokemon();
      expect(component.pokemon).toEqual(pokemon);
    })
  });

  describe(' Method validaDigito()) called ', ()=>{
    it('should handle a validDigit',()=>{
      const event={ charCode:14};
      spyOn(component, 'validaDigito' ).and.callThrough();
      component.validaDigito(event);
      expect(component.validaDigito).toBeTruthy;
    })
    it('should handle a not  validDigit',()=>{
      const event={ charCode:36};
      spyOn(component, 'validaDigito' ).and.callThrough();
      component.validaDigito(event);
      expect(component.validaDigito).toBeFalsy;
    })
  });


  describe(' Method resetOpciones()) called ', ()=>{
    it('should test',()=>{
      spyOn(component, 'resetOpciones' ).and.callThrough();
      component.resetOpciones();
      expect(component.isEditing).toBeFalsy;
      expect(component.resetPokemon).toHaveBeenCalled;
    })
  });
  // describe(' Method    called ', ()=>{

  // });

});
