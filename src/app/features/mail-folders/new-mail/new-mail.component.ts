import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MailService } from '../../../shared/services/mail.service';
import { Mail } from '../../../shared/services/mail.model';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.scss']
})
export class NewMailComponent implements OnInit {

  checkIfopen: boolean;

  mail = new Mail('', '', '', '', '');
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  d = new Date();

  onSubmit() {
    this.mail.date = (this.monthNames[this.d.getMonth()]).substring(0, 3) + " " + this.d.getDate() + ", " + this.d.getHours() + ":" + this.d.getMinutes() + "h";
    this.mailService.sentMail.unshift(this.mail);
    this.data.changeButton(false);
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<NewMailComponent>,
              private mailService: MailService,
              private data: DataService) { }

  ngOnInit() {
    this.data.currentCheck.subscribe(check => this.checkIfopen = check);
  }

  onCancel() {
    if(this.mail.sender.length > 0 && this.mail.subject.length > 0){
      this.mail.date = (this.monthNames[this.d.getMonth()]).substring(0, 3) + " " + this.d.getDate() + ", " + this.d.getHours() + ":" + this.d.getMinutes() + "h";
      this.mailService.draftsMail.unshift(this.mail);
    }
    this.data.changeButton(false);
    this.dialogRef.close();
  }
}
