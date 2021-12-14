import { Component, OnInit, OnDestroy } from '@angular/core';
import {AppareilService} from "./services/appareil.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {Subscription} from "rxjs";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{

  secondes: number = 0;
  counterSubscription : Subscription | undefined;

  ngOnInit() {
    const counter = Observable.interval(1000);
   this.counterSubscription =  counter.subscribe(
      (value ) =>{
        this.secondes = value;
      },
      (error)=>{
        console.log('Uh-oh, an error occurred! : '+ error);
      },
      () =>{
          console.log('Observable complete!');
      }
    );
  }

  ngOnDestroy(){
    this.counterSubscription?.unsubscribe();
  }

  constructor() {

  }
}

