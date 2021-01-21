import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })


export class HomeComponent {

  constructor(private router: Router) { }

  ngOnInit(): void {

 setTimeout(() => {
          setTimeout(() => {
            this.router.navigateByUrl("/users");
          });
        }, 30);
      }

  }
