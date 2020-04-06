import { Component, OnInit } from '@angular/core';
import { MailService } from '../../../shared/services/mail.service';
import { Mail } from '../../../shared/services/mail.model';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  inboxMails: Mail[];
  id: number;
  currentFolder: string;

  constructor(private mailService: MailService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.mailService.currentInbox.subscribe(mail => this.inboxMails = mail);
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
    });
  }

  onDelete(id) {
    this.currentFolder = this.route.snapshot.url[0].path;
    this.inboxMails = this.mailService.onDeleteMessage(id, this.currentFolder);
  }
}