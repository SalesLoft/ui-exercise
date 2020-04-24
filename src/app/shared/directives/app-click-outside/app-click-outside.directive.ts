import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output
} from "@angular/core";

@Directive({
  selector: "[clickOutside]"
})
export class AppClickOutsideDirective {
  constructor(private readonly _elementRef: ElementRef) {}

  @Output()
  public clickOutside = new EventEmitter<MouseEvent>();

  @Output() close: EventEmitter<any> = new EventEmitter();

  @HostListener("document:click", ["$event", "$event.target"])
  public onDocumentClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const trgtele: string = targetElement.outerHTML;
    const parent: string = this._elementRef.nativeElement.outerHTML;

    //if (targetElement && !this._elementRef.nativeElement.contains(targetElement))
    if (targetElement && parent.indexOf(trgtele) < 0) {
      this.clickOutside.emit(event);
    }
  }
}
