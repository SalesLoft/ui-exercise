import { Component, OnInit } from "@angular/core";
import { CollapsibleColumnService } from "../../services/collapsible-column.service";

@Component({
  selector: "header-panel",
  templateUrl: "./header-panel.component.html",
  styleUrls: ["./header-panel.component.scss"]
})
export class HeaderPanelComponent implements OnInit {
  collapse: boolean;

  constructor(private readonly collapsibleService: CollapsibleColumnService) {}

  ngOnInit() {
    console.log('Header click');
    this.collapse = this.collapsibleService.isOpen;
  }
}
