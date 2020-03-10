// import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
// import {NgModule}      from '@angular/core';
// import {BrowserModule} from '@angular/platform-browser';
// import {Component} from '@angular/core';

// @Component({
//   selector: 'joke',
//   template: `
//     <h1>What did the cheese say when it looked in the mirror?</h1>
//     <p>Halloumi (Hello Me)</p>
//   `
// })
// class JokeComponent {
// }

// @NgModule({
//   imports: [BrowserModule],
//   declarations: [JokeComponent],
//   bootstrap: [JokeComponent]
// })
// export class AppModule {
// }

// platformBrowserDynamic().bootstrapModule(AppModule);

import { Component, NgModule, Input, EventEmitter, Output } from "@angular/core"; //imort Component code from the module angular/core
import { BrowserModule, platformBrowser } from "@angular/platform-browser" 
import  { platformBrowserDynamic} from "@angular/platform-browser-dynamic"
// import { EventEmitter } from "events";

class Joke {
  setup: string;
  punchline: string;
  hide: boolean;
  
  constructor(setup: string, punchline: string){
    this.setup = setup; //this pointing to actual joke instance we are creating 
    this.punchline = punchline;
    this.hide = true
  }
  toggle(){
    this.hide = !this.hide
  }
}


@Component({
  selector: 'joke-form',
  template: `
<div class="card card-block">
  <h4 class="card-title">Create Joke</h4>
  <div class="form-group">
    <input type="text"
           class="form-control"
           placeholder="Enter the setup"
           #setup>
  </div>
  <div class="form-group">
    <input type="text"
           class="form-control"
           placeholder="Enter the punchline"
           #punchline>
  </div>
  <button type="button"
          class="btn btn-primary"
          (click)="createJoke(setup.value, punchline.value)">Create
  </button>
</div>
  `
})
class JokeFormComponent {
  @Output() jokeCreated = new EventEmitter<Joke>();
//@Output decorator
// EventEmitter and $event.
//Use # to create Template Local Variables
  createJoke(setup: string, punchline: string){
    this.jokeCreated.emit(new Joke(setup,punchline))
  }
}
// let joke = new Joke("haha", "haha lala")


@Component({ //anotation 
  selector: 'joke',// parameter selector, it tells to Angular which tag link this class to, by seetting this class to joke we've told to Angular,whenever Angular find html tag joke , use class JokeComponent
  template: ` 
  <div class="card card-block">                           
     <h4 class="card-title">{{ joke.setup }}</h4>
     <p class="card-text" [hidden]="joke.hide">{{ joke.punchline }}</p>
     <button class="btn btn-primary" (click)="joke.toggle()">Tell me</button>
     <button class="btn btn-danger" (click)="deleteJoke()">Delete</button>
  </div>
   `
   //{{}}--> we use to stringintrupulate
   // in order to replace that joke tag to html element we use template
})
class JokeComponent {//CLASS is a blueprint for an object. to create instance of class we use new keyword
  // constructor(){ 
   @Input('joke') joke: Joke;
   @Output() jokeDelete = new EventEmitter<Joke>()
    deleteJoke() {
      this.jokeDelete.emit(this.joke)
    }
  // }//in order to setup, initialize values we use function constructor
}

// let joke = new JokeComponent()//create object : using class JokeComponent, instance
// console.log(joke.setup);
// console.log(joke.punchline)//we didn't set any values to setup instance

@Component({ //anotation 
  selector: 'joke-list',// parameter selector, it tells to Angular which tag link this class to, by seetting this class to joke we've told to Angular,whenever Angular find html tag joke , use class JokeComponent
  template: ` 
  <joke-form (jokeCreated)="addJoke($event)">
  </joke-form>
  <joke  *ngFor="let j of jokes" [joke]="j"
  (jokeDelete)="deleteJoke($event)"
  ></joke>
   `
   //{{}}--> we use to stringintrupulate
   // in order to replace that joke tag to html element we use template
})

class JokeListComponent {
  jokes: Joke[];//array ,list of object
  constructor(){
    this.jokes = [
      new Joke("haha","haha lala" ),
      new Joke("What kind of cheese do you see to dushuise a small horse","Maskpony-aaa" ),
      new Joke("xxoxoxo","xoxoxo" )
    ]
  }
  addJoke(joke){
    this.jokes.unshift(joke)
  }
  deleteJoke(joke){
    let indexToDelete = this.jokes.indexOf(joke)
    if(indexToDelete !== -1){
      this.jokes.splice(indexToDelete,1)
    }
  }
}

@Component({
  selector: "app",
  template: `
  <joke-list></joke-list>
  `
})
class AppComponent {

}


@NgModule({
  imports: [BrowserModule], //parameter, list of other Angular module to explore materials we need in this angular module, almost every applications root module should import BROWSERMODULE
  declarations: [JokeComponent, 
    JokeListComponent,
    JokeFormComponent,
    AppComponent
  ], //the list of components all directives belonging to this Angular module 
  bootstrap: [AppComponent] //WE TELLING THAT JOKECOMPONENT IS OUR ROOT
}
 export class AppModule { // to define Angular module first we create a class

}



platformBrowserDynamic().bootstrapModule(AppModule)