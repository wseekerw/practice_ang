import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostsService } from '../posts.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('openClose', [

      state('open', style({
        height: '100px',
        opacity: 1,
        backgroundColor: 'red',
        marginLeft: '30px',
        borderRadius: '0'
      })),
    
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green',
        marginLeft: '500px',
        borderRadius: '50%'
      })),
      
      transition('open => closed', [
        animate('1s')
      ]),
      
      transition('closed => open', [
        animate('1s')
      ]),

    ]),
  ]
})
export class MainComponent implements OnInit { 
  
  user: string;
  editUser: string;
  isOpen = true;

  constructor(private postService: PostsService) { }

  ngOnInit() {
      this.postService.cast.subscribe(user => this.user = user)
  }

  editTheUser(){
    this.postService.editUser(this.editUser);
  }
  
  // Animation function
  // toggle() {
  //   this.isOpen = !this.isOpen;
  // }

}
