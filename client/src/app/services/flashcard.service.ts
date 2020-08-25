import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

import {Card} from "../models/card.model";
import {Set} from "../models/set.model";

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  baseUrl = 'http://localhost:5000';
  selectSet = new EventEmitter<Set>();

  constructor(private http: HttpClient) { }

  getSets(): Observable<Set[]> {
    return this.http.get<Set[]>(this.baseUrl);
  }

  addSet(title: string) {
    return this.http.post(this.baseUrl, {
      title: title
    });
  }

  deleteSet(id: number) {
    return this.http.delete(this.baseUrl + '/?id=' + id);
  }

  getCards(id: number): Observable<Card[]> {
    return this.http.get<Card[]>(this.baseUrl + '/sets/' + id);
  }

  addCard(id: number, card) {
    return this.http.post(this.baseUrl + '/sets/' + id, card);
  }

  deleteCard(id: number) {
    return this.http.delete(this.baseUrl + '/sets/?id=' + id);
  }
}
