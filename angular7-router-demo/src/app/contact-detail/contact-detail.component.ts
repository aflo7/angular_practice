import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  template: `
    <div *ngIf="!contact">Loading...</div>

    <div *ngIf="contact">
    <h1>Contact # {{ contact.id }}</h1>
    <p>Name: {{ contact.name }}</p>
    <p>Email: {{ contact.email }}</p>
    </div>
    
  `,
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  contact: any;
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idToRetrieve = params.get('id')
      if (idToRetrieve === null) {
        alert("Error")
        return
      }

      this.contactService.getContact(idToRetrieve).subscribe((contactFromBackend) => {
        this.contact = contactFromBackend;
      });
    });
  }
}
