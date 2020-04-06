import { Component, OnInit } from '@angular/core';
import { Mail } from '../../../shared/services/mail.model';
import { MailService } from '../../../shared/services/mail.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit {

  draftsMail: Mail[];
  id: number;
  currentFolder: string;

  constructor(private mailService: MailService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.mailService.currentDrafts.subscribe(mail => this.draftsMail = mail);
  }

  onDelete(id) {
    this.currentFolder = this.route.snapshot.url[0].path;
    this.draftsMail = this.mailService.onDeleteMessage(id, this.currentFolder);
  }
}
