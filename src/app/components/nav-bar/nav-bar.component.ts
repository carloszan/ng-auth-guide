import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public isLogged: boolean;
  
  constructor(
    private userService: UserService
  ) {
    this.isLogged = this.userService.tokenValue ? true : false;
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
  }
}
