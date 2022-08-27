import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon-service.service';
import { of } from 'rxjs';

describe('PokemonServiceService', () => {
  let service: PokemonService;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [PokemonService]
    });
    service = TestBed.inject(PokemonService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClientSpy= jasmine.createSpyObj('HttpClient', ['post'])
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(' createPokemon() -= should create a new pokemon', ()=>{
    const newPokemon={
      name: "zapdos",
      image: "",
      attack: 50,
      defense: 50,
      hp:100,
      type:"Electric",
      idAuthor:1
    }
    const result={
      id: 3791,
      name: "zapdos",
      image: "",
      attack: 50,
      defense: 50,
      hp:100,
      type:"Electric",
      idAuthor:1
    }
    httpClientSpy.post.and.returnValue(of(result));
    service.createPokemon(newPokemon).subscribe( res=>{
      expect(res).toEqual(result);
    })
  })

  it(' getPokemonByQty() -- should obtain n pokemons ', ()=>{
    httpClientSpy= jasmine.createSpyObj('HttpClient', ['get'])
    const qty='3';
    const params={ idAuthor: 1};
    
    service.getPokemonByQty(qty,params).subscribe( (res:any) =>{
      expect(res.length).toBe(3);
    })
  })
  it('should uipdate a pokemon by its id ', ()=>{
    httpClientSpy= jasmine.createSpyObj('HttpClient', ['put'])
    const id='3799'
    const editPokemon={
      name: "zapdos",
      image: "",
      attack: 50,
      defense: 50,
      hp:101,
      type:"Electric",
      idAuthor:1
    }
    const result={
      id: 3791,
      name: "zapdos",
      image: "",
      attack: 50,
      defense: 50,
      hp:101,
      type:"Electric",
      idAuthor:1
    }
    httpClientSpy.put.and.returnValue(of(result));
    service.updatePokemon(id,editPokemon).subscribe( res=>{
      expect(res).toEqual(result);
    })
  })

  it('should obtain a pokemon by its id ', ()=>{
    httpClientSpy= jasmine.createSpyObj('HttpClient', ['get'])
    const id='3799'
    const result={
      id: 3791,
      name: "zapdos",
      image: "",
      attack: 50,
      defense: 50,
      hp:101,
      type:"Electric",
      idAuthor:1
    }
    httpClientSpy.get.and.returnValue(of(result));
    service.getPokemonById(id).subscribe( res=>{
      expect(res).toEqual(result);
    })
  })

  it('should delete a pokemon by its id ', ()=>{
    httpClientSpy= jasmine.createSpyObj('HttpClient', ['delete'])
    const id='3799'
    const result={
      "success": true,
      "type": "pokemon_removed",
      "data": []
    }
    httpClientSpy.delete.and.returnValue(of(result));
    service.deletePokemon(id).subscribe( res=>{
      expect(res).toEqual(result);
    })
  })

});
