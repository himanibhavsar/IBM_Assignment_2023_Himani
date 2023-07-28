import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileComponent } from './profile.component';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule, MatToolbarModule, MatCardModule],
      providers: [UserService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUserProfile on init', () => {
    const user = { name: 'King Julien', email: 'kingj@email.com', bio: 'Hi my name is King Julien and I like to move it move it.', img: 'https://tinyurl.com/2p9953zy' };
    spyOn(userService, 'getUserProfile').and.returnValue(of(user));
    component.ngOnInit();
    expect(userService.getUserProfile).toHaveBeenCalled();
    expect(component.user).toEqual(user);
  });

  it('should handle image error', () => {
    const event = { target: { src: '' } };
    component.handleImageError(event);
    expect(event.target.src).toEqual(component.defaultImage);
    expect(component.imageError).toEqual('Failed to load image, so default image is shown');
  });
});
