import { Component, OnInit } from '@angular/core';
import { Observable, subscribeOn } from 'rxjs';
import { UserService } from 'src/service/user.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private user: UserService) {}
  ngOnInit(): void {
    // this.getAllItems()
  }

  // getAllItems(): void {
  //   this.user.getAllUsers().subscribe((response: any) => {
  //     console.log(response);
  //   });
  // }
}
