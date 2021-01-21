import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.component.html',
  styleUrls: ['./addlist.component.css']
})
export class AddlistComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

 setTimeout(() => {
          setTimeout(() => {
            this.router.navigateByUrl("/users");
          });
        }, 3400);
      }

  }

