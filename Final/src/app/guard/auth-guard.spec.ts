import { AuthGuard } from './auth-guard';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuth: any;
  let mockRouter: any;

  beforeEach(() => {
    mockAuth = {
      authenticated: false
    };
    
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    guard = new AuthGuard(mockAuth, mockRouter);
  });

  it('debería permitir acceso si el usuario está autenticado', () => {
    mockAuth.authenticated = true;
    
    const resultado = guard.canActivate();
    
    expect(resultado).toBeTrue();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('debería denegar acceso y redirigir a login si no está autenticado', () => {
    mockAuth.authenticated = false;
    
    const resultado = guard.canActivate();
    
    expect(resultado).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});