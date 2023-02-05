import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ItemInterface } from '../../item';

@Component({
  selector: 'app-item',
  template: `<div class="item">

  <input [id]="item.description" type="checkbox" (change)="item.done = !item.done" [checked]="item.done" />
  <label [for]="item.description">{{item.description}}</label>

  <div class="btn-wrapper" *ngIf="!editable">
    <button class="btn" (click)="toggleEditable()">Edit</button>
    <button class="btn btn-warn" (click)="remove.emit()">Delete</button>
  </div>

  <!-- This section shows only if user clicks Edit button -->
  <div *ngIf="editable">
    <!-- [value] makes it so the value of the input is bound to the description of the current item -->
    <input class="sm-text-input" placeholder="edit item" [value]="item.description" #editedItem (keyup.enter)="saveItem(editedItem.value)">
    <!-- The template variable, #editedItem, on the <input> means that Angular stores whatever a user types in this <input> in a variable called editedItem.value -->

    <div class="btn-wrapper">
      <button class="btn" (click)="toggleEditable()">Cancel</button>
      <button class="btn btn-save" (click)="saveItem(editedItem.value)">Save</button>
    </div>
  </div>

</div>
`,
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  editable: boolean = false;

  toggleEditable() {
    this.editable = !this.editable
  }

  // the ! is required for input and outputs
  @Input() item!: ItemInterface; // coming from outside in
  @Input() newItem!: string;
  @Output() remove = new EventEmitter<ItemInterface>(); // output is always used with EventEmitter // outputs go from inside out

  saveItem(description: string) {
    if (!description) return;
    this.editable = false;
    this.item.description = description;
  }
}
