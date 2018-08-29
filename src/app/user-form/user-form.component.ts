import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  model: User;

  constructor(private fb: FormBuilder) { }

  submitted = false;
  
  onSubmit() { 
    this.submitted = true;

    this.model = new User(1, this.userForm.value.email, this.userForm.value.password);

    console.log(this.model);
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() { return this.userForm.get('email'); }

  get password() { return this.userForm.get('password'); }

}
