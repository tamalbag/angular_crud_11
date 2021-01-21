import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '@app/_services';
import { User } from '@app/_models';

import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users!: User[];
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;
     public show:boolean = false;
  public buttonName:any = '';
  bgColor : string = '#e6e6e6';
  color: string = '';
  


    constructor(private userService: UserService,
          private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService
        ) {}

  

    ngOnInit() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);

         this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        
          const formOptions: AbstractControlOptions = { };
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
          lastName: ['', Validators.required],
        }, formOptions);

        if (!this.isAddMode) {
            this.userService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }


    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        if (!user) return;
        user.isDeleting = true;
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }


    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.userService.create(this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('User added', { keepAfterRouteChange: true });
                this.router.navigate(['/user'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }

    private updateUser() {
        this.userService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('updated', { keepAfterRouteChange: true });
                this.router.navigate(['../../'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }

toggle() {
    this.show = !this.show;
      // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "";
    else
      this.buttonName = "";
  }


    changeColor(id:string){


        
        this.userService.getById(id)
        
            .pipe(first())
            .subscribe(bgColor => this.users = this.users.filter(bgColor => this.bgColor ="#00e600"));


    }
   
   CrossColors(id: string)
   {
          
        this.userService.getById(id)
        
            .pipe(first())
            .subscribe(bgColor => this.users = this.users.filter(bgColor => this.bgColor ="#e62e00"));
   } 
}
