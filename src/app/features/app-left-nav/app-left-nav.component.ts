import { Component, OnInit, HostBinding } from '@angular/core';
import { CollapsibleColumnService } from "../../shared/services/collapsible-column.service";
import { MailService } from '../../shared/services/mail.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NewMailComponent } from '../mail-folders/new-mail/new-mail.component';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-app-left-nav',
  templateUrl: './app-left-nav.component.html',
  styleUrls: ['./app-left-nav.component.scss']
})
export class AppLeftNavComponent implements OnInit {

  @HostBinding("class.is-open")
  isOpen = true;

  checkIfopen: boolean = false;

  isHidden = false;
  expanded = false;
  public menuItem = "";

  constructor(
    private readonly collapsibleService: CollapsibleColumnService,
    private mailService: MailService,
    private dialog: MatDialog,
    private data: DataService) { }

  ngOnInit() {
    this.collapsibleService.change.subscribe(isOpen => {
      console.log('inside sidenav', isOpen);
      this.isOpen = isOpen;
    });
    this.data.currentCheck.subscribe(check => this.checkIfopen = check);
  }

  mailCounter(path: string) {
    return this.mailService.mailCount(path);
  }

  newMail() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(NewMailComponent, dialogConfig);
    this.checkIfopen = true;
  }

  showMenuItems(item) {
    this.isHidden = !this.isHidden;
    if (this.menuItem !== item) {
      this.isHidden = true;
    }
    this.menuItem = item;
    this.expanded = false;
  }

  toggleSubMenu() {
    this.expanded = true;
    this.isHidden = false;
  }

  closeMenuItems() {
    this.menuItem = "";
  }

}
