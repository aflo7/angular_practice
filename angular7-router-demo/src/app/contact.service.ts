import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  API_URL: string = "/api/";
  constructor(private http: HttpClient) { }

  // this method gets all contacts in the fake backend server
  getContacts(){    
    console.log("getting contacts")
   return this.http.get(this.API_URL + 'contacts')
  }

  getContact(contactId: string){
   return this.http.get(`${this.API_URL + 'contacts'}/${contactId}`) 
  }
}
