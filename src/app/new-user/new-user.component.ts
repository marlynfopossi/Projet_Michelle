import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserServiceService} from "../services/user-service.service";
import {Router} from "@angular/router";
import {User} from "../models/User.model";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  // @ts-ignore
  userForm : FormGroup;

  constructor(private formBuilder : FormBuilder, private userService : UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      drinkPreference : ['', Validators.required],
      hobbies : this.formBuilder.array([])
      });
  }

  onSubmitForm(){
    const formvalue = this.userForm.value;
    const newUser = new User(
      formvalue['firstName'],
      formvalue['lastName'],
      formvalue['email'],
      formvalue['drinkPreference'],
      formvalue['hobbies']? formvalue['hobbies'] : []
    );
    this.userService.addUser(newUser);
    this.router.navigate(['/users']);
  }

  getHobbies(): FormArray{
    return this.userForm.get('hobbies') as FormArray;
  }

  onAddHobby(){
    const newHobbyControl = this.formBuilder.control(null, Validators.required);
    this.getHobbies().push(newHobbyControl);
  }
}
