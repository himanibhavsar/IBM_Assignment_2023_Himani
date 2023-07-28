import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { RegistrationComponent } from './registration.component';
import { UserService } from '../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';



describe('RegistrationComponent', () => {
  


  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [RegistrationComponent],
      providers: [UserService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitting a form emits a user', () => {
    expect(component.registrationForm.valid).toBeFalsy();

    let registerUser = spyOn(component['userService'], 'registerUser').and.callThrough();

    component.registrationForm.controls['name'].setValue("test");
    component.registrationForm.controls['email'].setValue("test@test.com");
    component.registrationForm.controls['password'].setValue("123456789");
    component.registrationForm.controls['bio'].setValue("bio");

    expect(component.registrationForm.valid).toBeTruthy();

    component.submitRegisterButton();

    expect(registerUser).toHaveBeenCalled();
    expect(component.registrationForm.value.name).toBe("test");
    expect(component.registrationForm.value.email).toBe("test@test.com");
    expect(component.registrationForm.value.password).toBe("123456789");
    expect(component.registrationForm.value.bio).toBe("bio");
  });

  it('should not call registerUser when form is invalid', () => {
    expect(component.registrationForm.valid).toBeFalsy();

    let registerUser = spyOn(userService, "registerUser");

    component.registrationForm.controls['name'].setValue("");
    component.registrationForm.controls['email'].setValue("");
    component.registrationForm.controls['password'].setValue("");
    component.registrationForm.controls['bio'].setValue("");

    expect(component.registrationForm.valid).toBeFalsy();

    expect(registerUser).not.toHaveBeenCalled();
  });

  it('should navigate to profile page when registration is successful', () => {
    let registerUser = spyOn(userService, "registerUser");
    registerUser.and.returnValue(of({ success: true }));
    const navigateSpy = spyOn(router, 'navigate');

    component.registrationForm.setValue({
      name: 'Test',
      email: 'test@example.com',
      password: 'password',
      bio: 'Test bio'
    });

    component.submitRegisterButton();

    expect(navigateSpy).toHaveBeenCalledWith(['/profile']);
  });


  it('should not navigate to profile page when registration is unsuccessful', () => {
    let registerUser = spyOn(userService, "registerUser");

    registerUser.and.returnValue(of({ success: false }));
    const navigateSpy = spyOn(router, 'navigate');

    component.registrationForm.setValue({
      name: 'Test',
      email: 'test@example.com',
      password: 'password',
      bio: 'Test bio'
    });

    component.submitRegisterButton();

    expect(navigateSpy).not.toHaveBeenCalled();
  });

});
