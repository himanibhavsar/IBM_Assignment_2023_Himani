import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  imageError!: string;
  defaultImage = './assets/images/default-image.jpg';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(user => this.user = user);
  }
  handleImageError(event: any) {
    event.target.src = this.defaultImage;
    this.imageError = 'Failed to load image, so default image is shown';
  }
}
