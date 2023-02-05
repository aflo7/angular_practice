import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  template: `
    <div *ngIf="contacts.length === 0">Loading...</div>

    <div *ngIf="contacts.length > 0">
      <table style="width:100%">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
        <tr *ngFor="let contact of contacts">
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>
            <a [routerLink]="['/contact', contact.id]">Go to details</a>
          </td>
        </tr>
      </table>
    </div>
  `,
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: any[] = [];

  constructor(private contactService: ContactService) {}

  // on first mount, retrieve the contacts from the database and store them in this components contacts variable
  ngOnInit() {
    this.contactService
      .getContacts()
      .subscribe((contactsFromBackend: any) => {
        this.contacts = contactsFromBackend;
      });
  }
}
