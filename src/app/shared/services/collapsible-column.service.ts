import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollapsibleColumnService {

  constructor() { }

  isOpen = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }
  
  close() {
    this.isOpen = false;
    this.change.emit(this.isOpen);
  }
}
