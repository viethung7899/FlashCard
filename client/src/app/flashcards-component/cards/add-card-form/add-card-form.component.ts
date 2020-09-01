import { Component, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

import { Set } from '../../../_models/set.model'
import { FlashcardService } from '../../../_services/flashcard.service'

@Component({
  selector: 'app-add-card-form',
  templateUrl: './add-card-form.component.html',
  styleUrls: ['./add-card-form.component.css'],
})
export class AddCardFormComponent implements OnInit {
  @Input() set: Set
  addForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private flashcardService: FlashcardService
  ) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      title: '',
      description: '',
    })
  }

  addCard(): void {
    console.log(this.addForm.value)
    this.flashcardService
      .addCard(this.set.set_id, this.addForm.value)
      .subscribe(() => this.flashcardService.reloadCards.emit())
    this.addForm.reset()
  }

  get title() {
    return this.addForm.get('title').value
  }

  get description() {
    return this.addForm.get('description').value
  }
}
