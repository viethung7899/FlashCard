import {Component, OnInit, ViewChild, EventEmitter, ComponentFactoryResolver} from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { Set } from '../../../_models/set.model'
import { User } from '../../../_models/user.model'
import { FlashcardService } from '../../../_services/flashcard.service'
import {AlertComponent} from "../../../shared/alert/alert.component";
import {PlaceholderDirective} from "../../../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css'],
})
export class SetListComponent implements OnInit {
  // Data
  sets: Set[]
  user: User

  // Forms
  @ViewChild('addSetForm') form: NgForm
  newSetTitle: string
  setFinding = ''

  // Event emitter
  reloadSets = new EventEmitter<void>()

  // Component generating
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.user = this.flashcardService.getUser()
    this.loadSets()
  }

  loadSets(): void {
    this.flashcardService
      .getSets()
      .subscribe((sets) => (this.sets = sets.reverse()))
  }

  addSet() {
    this.flashcardService.addSet(this.newSetTitle).subscribe((set) => {
      this.router.navigate([set.set_id], { relativeTo: this.route })
    })
  }

  onDeletion(set: Set) {
    const alertComponent = this.showAlert(`Do you want to delete this set? - [${set.title}]`)
    alertComponent.instance.confirmEvent.subscribe(() => {
      this.flashcardService.deleteSet(set.set_id).subscribe(() => this.loadSets())
    })
  }

  includeWords(set: Set) {
    const title = set.title.toLowerCase()
    const key = this.setFinding.toLowerCase()

    return key.trim().length === 0 || title.includes(key)
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
