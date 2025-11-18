import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
// configuracion el cliente HTTP
import { provideHttpClient } from '@angular/common/http';
// herramientas para SIMULAR peticiones HTTP
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

// definir el grupo de pruebas
describe('pruebas de el servicio de Login', () => {
  // definir nuestros mocks -> simulacion relacionada con peticiones a una Api
  let httpMock: HttpTestingController;
  let service: LoginService;

  const credencialMock = {
    email: 'pepita@gmail.com',
    password: '123',
  };
  const tokenMock = 'asdfghjkloiuytresxcvbnmkjuhygtfds';

  beforeEach(() => {
    // la configuracion inicial del entorno de pruebas
    TestBed.configureTestingModule({
      providers: [
        LoginService, 
        provideHttpClient(), 
        provideHttpClientTesting()
      ],
    });
    
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LoginService);
});

    // 2. definir los casos de prueba

    // caso1: Simular la peticion POST para iniciar sesion
  it('caso 1: Simular la peticion POST para iniciar sesion', () => {
    const apiUrl = 'http://localhost:9000/iniciarSesion';
    const responseMock = { mensaje: 'inicio de sesion exitoso' };

    service.login(credencialMock.email, credencialMock.password).subscribe(
        (res) => {
            expect(res).toEqual(responseMock);
        }
    );

    // simulacion de peticion a backend
    const req = httpMock.expectOne(apiUrl); //esa simulacion se espera que sea igual a la url dada
    expect(req.request.method).toBe('POST');
    
    req.flush(responseMock);

  });

  it('caso 2: Obtener token', () => {
    localStorage.setItem('token', tokenMock);
    expect(service.getToken()).toBe(tokenMock); // me debe traer el token de localStorage
  });

  it('caso 3: Verificar si esta logeado o no', () => {
    localStorage.setItem('token', tokenMock);
    expect(service.isLoggedIn()).toBeTrue(); // debe retornar true si hay token
  });

  it('caso 4: Verificar si se cierra sesion', () => {
    localStorage.setItem('token', tokenMock);
    service.logout(); // primero cerrar sesion
    expect(localStorage.getItem('token')).toBeNull(); // debe ser null despues de cerrar sesion
  });

});
