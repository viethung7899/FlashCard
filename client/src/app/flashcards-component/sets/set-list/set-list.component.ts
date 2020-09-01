import { Component, OnInit, ViewChild } from '@angular/core'

import { Set } from '../../../_models/set.model'
import { User } from '../../../_models/user.model'
import { FlashcardService } from '../../../_services/flashcard.service'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css'],
})
export class SetListComponent implements OnInit {
  @ViewChild('addSetForm') form: NgForm
  sets: Set[]
  user: User

  newSetTitle: string
  setFinding = ''

  constructor(
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private router: Router
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

  includeWords(set: Set) {
    const title = set.title.toLowerCase()
    const key = this.setFinding.toLowerCase()

    return key.trim().length === 0 || title.includes(key)
  }
}
