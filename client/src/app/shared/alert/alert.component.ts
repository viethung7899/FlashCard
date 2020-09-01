import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message
  @Output() confirmEvent = new EventEmitter<void>()
  @Output() cancelEvent = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.cancelEvent.emit()
  }

  onConfirm(): void {
    this.confirmEvent.emit()
  }
}
