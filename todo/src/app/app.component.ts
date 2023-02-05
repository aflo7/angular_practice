import { Component } from '@angular/core';

import { ItemInterface } from '../item';

@Component({
  selector: 'app-root',
  template: `<div class="main">
    <!-- pressing the enter key adds a new item with this elements value, also resets this value of the input to an empty string -->
    <input
      #newItem
      placeholder="add an item"
      (keyup.enter)="addItem(newItem.value); newItem.value = ''"
      class="lg-text-input"
      id="addItemInput"
    />

    <button class="btn-primary" (click)="addItem(newItem.value)">Add</button>

    <div class="btn-wrapper">
    <button
      class="btn btn-menu"
      [class.active]="filter == 'all'"
      (click)="filter = 'all'">
      All
    </button>

    <button
      class="btn btn-menu"
      [class.active]="filter == 'active'"
      (click)="filter = 'active'">
      To Do
    </button>

    <button
      class="btn btn-menu"
      [class.active]="filter == 'done'"
      (click)="filter = 'done'">
      Done
    </button>

    
  </div>
    <ul>
      <!-- for each item create a new list element -->
      <!-- <li *ngFor="let item of items">{{ item.description }}</li> -->

      <li *ngFor="let i of items">
        <!-- bind the value of i between app and item component, bound to [item] -->
        <app-item (remove)="remove(i)" [item]="i"></app-item>


      </li>
    </ul>

    <h2 *ngIf="items.length > 0">
      {{ items.length }}
      <span *ngIf="items.length === 1; else elseBlock">item</span>
      <ng-template #elseBlock>items</ng-template>
    </h2>

    <h2 *ngIf="items.length === 0">
          <span>You're all caught up!</span>
    </h2>


    <!-- <h3>You have {{ items.length }} tasks</h3> -->
  </div>`,
  styleUrls: ['./app.component.css'],
})

// AppComponent is the main entryway into an angular project
// AppComponent is like a super parent
export class AppComponent {
  filter: 'all' | 'active' | 'done' = 'all'; // this is called a union type..

  allItems: ItemInterface[] = [
    { description: 'eat', done: true, dateCreated: new Date() },
    { description: 'sleep', done: false, dateCreated: new Date() },
    { description: 'play', done: false, dateCreated: new Date() },
    { description: 'laugh', done: false, dateCreated: new Date() },
    { description: 'code', done: false, dateCreated: new Date() },
  ];

  // you can now use items within the HTML template...
  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.filter === 'done' ? item.done : !item.done
    );
  }

  addItem(description: string) {
    const newItem: ItemInterface = {
      description,
      done: false,
      dateCreated: new Date(),
    };
    this.allItems.push(newItem);
  }

  remove(itemToRemove: ItemInterface) {
    // this.allItems.splice(this.allItems.indexOf(item), 1);
    this.allItems = this.allItems.filter(
      (item) => item.description !== itemToRemove.description
    );
  }
}

// components can have file names like header.component.ts, signup.component.ts, or feed.component.ts

// Angular directives, like *ngIf and *ngFor, allow us to change the structure of the DOM dynamically

// sharing data between Angular components is done with @Input() and @Output()
