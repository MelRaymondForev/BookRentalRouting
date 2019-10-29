import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

import './_content/app.less';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    title = "bookRental";
    description = "Book Rental Website";

    itemvalue: '';
    items: Observable<any[]>;

    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        public db: AngularFireDatabase
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.items = db.list("items").valueChanges();
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}