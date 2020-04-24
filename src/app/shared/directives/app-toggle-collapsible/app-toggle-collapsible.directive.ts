import { Directive, HostListener } from "@angular/core";
import { CollapsibleColumnService } from "../../services/collapsible-column.service";

@Directive({
  selector: "[AppToggleCollapsible]"
})
export class AppToggleCollapsibleDirective {
  constructor(private readonly collapsibleService: CollapsibleColumnService) {}
  @HostListener("click")
  click() {
    this.collapsibleService.toggle();
  }
}
