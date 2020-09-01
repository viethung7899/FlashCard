import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";

import {Observable, of} from "rxjs";

import {Set} from "../_models/set.model";
import {FlashcardService} from "../_services/flashcard.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SetResolverService implements Resolve<Set>{

  constructor(private flashcardService: FlashcardService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const setID = route.params['id']
    return this.flashcardService.getCards(setID).pipe(
        catchError((err: any) => {
          this.router.navigate(['/error'])
          return of(null)
        })
    )
  }


}
