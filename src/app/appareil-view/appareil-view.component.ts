import { Component, OnInit } from '@angular/core';
import {AppareilService} from "../services/appareil.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.css']
})
export class AppareilViewComponent implements OnInit {

  isAuth = false;
  lastUpdate = new Date();
  appareils : any[] = [];
  appareilSubscription : Subscription  | undefined;


  constructor(private appareilService: AppareilService) {
    setTimeout(    () => {   this.isAuth = true;  }, 4000  );
  }
  ngOnInit(){
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils : any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre()
  {
    if (confirm('Etes-vous sur de vouloir éteindre tous vos appareils ?')){
      return this.appareilService.switchOffAll();
    }
    else {
      return null;
    }
  }

   ngOnDestroy(){
    this.appareilSubscription?.unsubscribe();
   }

}
