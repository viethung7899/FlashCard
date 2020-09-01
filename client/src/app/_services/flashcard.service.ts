import { Injectable, EventEmitter } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Card } from '../_models/card.model'
import { Set } from '../_models/set.model'
import { User } from '../_models/user.model'

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  baseUrl = 'http://localhost:5000'

  // Event emitter
  reloadCards = new EventEmitter()

  constructor(private http: HttpClient) {}

  getUser(): User {
    return JSON.parse(localStorage.getItem('user'))
  }

  getSets(): Observable<Set[]> {
    return this.http.get<Set[]>(this.baseUrl)
  }

  getSetById(id: number): Observable<Set> {
    return this.http.get<Set>(this.baseUrl + '/' + id)
  }

  addSet(title: string): Observable<Set> {
    return this.http.post<Set>(this.baseUrl + '/add', {
      title: title,
    })
  }

  deleteSet(id: number) {
    return this.http.delete(this.baseUrl + '/delete/' + id)
  }

  getCards(id: number): Observable<Card[]> {
    return this.http.get<Card[]>(this.baseUrl + '/sets/' + id)
  }

  getCardById(id: number): Observable<Card> {
    return this.http.get<Card>(this.baseUrl + '/sets/get/' + id)
  }

  addCard(id: number, card) {
    return this.http.post(this.baseUrl + '/sets/add/' + id, card)
  }

  deleteCard(id: number) {
    return this.http.delete(this.baseUrl + '/sets/delete/' + id)
  }
}
