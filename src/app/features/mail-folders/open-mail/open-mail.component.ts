import { Component, OnInit } from "@angular/core";
import { MailService } from '../../../shared/services/mail.service';
import { Mail } from '../../../shared/services/mail.model';
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: "app-open-mail",
  templateUrl: "./open-mail.component.html",
  styleUrls: ["./open-mail.component.scss"]
})
export class OpenMailComponent implements OnInit {
  openMail;
  id: number;
  currentFolder: string;

  constructor(
    private mailService: MailService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      if (this.router.url === "/inbox/" + this.id) {
        this.openMail = this.mailService.getInboxMail(this.id);
      } else if (this.router.url === "/sent/" + this.id) {
        this.openMail = this.mailService.getSentMail(this.id);
      } else if (this.router.url === "/drafts/" + this.id) {
        this.openMail = this.mailService.getDraftMail(this.id);
      } else if (this.router.url === "/trash/" + this.id) {
        this.openMail = this.mailService.getTrashMail(this.id);
      }
    });
    this.currentFolder = this.route.snapshot.url[0].path;
  }

  onDeleteOpen() {
    this.currentFolder = this.route.snapshot.url[0].path;
    this.mailService.onDeleteMessage(this.id, this.currentFolder);
    this.router.navigate([this.currentFolder]);
  }

  goBack() {
    this.router.navigate([this.route.snapshot.url[0].path]);
  }
}
