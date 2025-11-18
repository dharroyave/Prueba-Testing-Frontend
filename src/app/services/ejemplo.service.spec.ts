// importaciones necesarias para las pruebas unitarias

import { TestBed } from '@angular/core/testing'; //configuración del entorno de pruebas
import { EjemploService } from './ejemplo.service'; //importación del servicio a probar

describe('EjemploService', () => {
  let service: EjemploService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EjemploService]
    });
    service = TestBed.inject(EjemploService);
  });

// definición de la prueba unitaria
  it('Debería sumar 2 números correctamente', ()=>{
    const resultado = service.suma(2,5);
    expect(resultado).toBe(7);
  })
});
