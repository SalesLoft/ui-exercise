import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[AppTruncateText]"
})
export class AppTruncateTextDirective {
  @Input("AppTruncateText")
  appTruncateText: number;
  private el: HTMLInputElement;

  constructor(private readonly elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener("input")
  onKeydown() {
    if (this.el.value.length <= this.appTruncateText) {
      return;
    }
    this.el.value = this.el.value.substr(0, this.appTruncateText);
  }
}
