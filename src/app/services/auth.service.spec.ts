import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register user', () => {
    service.registerUser();
    expect(service.isRegistered()).toBeTrue();
  });

  it('should check if user is registered', () => {
    service.registerUser();
    const isRegistered = service.isRegistered();
    expect(isRegistered).toBeTrue();
  });
});
