import {Component, ComponentFactoryResolver, OnInit, ViewChild, EventEmitter} from '@angular/core'

import { Set } from '../../../_models/set.model'
import { Card } from '../../../_models/card.model'
import { FlashcardService } from '../../../_services/flashcard.service'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {PlaceholderDirective} from "../../../shared/placeholder/placeholder.directive";

import {AlertComponent} from "../../../shared/alert/alert.component";

@Component({
  selector: 'app-cards-detail',
  templateUrl: './cards-detail.component.html',
  styleUrls: ['./cards-detail.component.css'],
})
export class CardsDetailComponent implements OnInit {
  set: Set
  cards: Card[] = []
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id']
    this.loadSet(id)
    this.loadCards(id)
    this.flashcardService.reloadCards.subscribe(() => {
      this.loadCards(id)
    })
  }

  loadSet(id: number): void {
    if (id) {
      this.flashcardService.getSetById(id).subscribe((set) => (this.set = set))
    }
  }

  loadCards(id: number): void {
    if (id) {
      this.flashcardService
        .getCards(id)
        .subscribe((cards) => (this.cards = cards.reverse()))
    }
  }

  onCardDeletion(card: Card) {
    const alertComponent = this.showAlert(`Do you want to delete this card? - ${card.title}`)
    alertComponent.instance.confirmEvent.subscribe(() => {
      this.flashcardService.deleteCard(card.card_id).subscribe(() => {
        this.flashcardService.reloadCards.emit()
      })
    })
  }

  onSetDeletion() {
    const alertComponent = this.showAlert(`Do you want to delete this set?`)
    alertComponent.instance.confirmEvent.subscribe(() => {
      this.flashcardService.deleteSet(this.set.set_id).subscribe(() => {
        this.router.navigate(['/sets'])
      })
    })
  }

  private showAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()

    const alertRef = hostViewContainerRef.createComponent(alertComponentFactory)
    alertRef.instance.message = message
    alertRef.instance.cancelEvent.subscribe(() => alertRef.destroy())
    return alertRef
  }
}
