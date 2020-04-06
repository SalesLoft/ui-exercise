import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppLayoutsRoutingModule } from "./features-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AppLeftNavComponent } from './app-left-nav/app-left-nav.component';
import { NewMailComponent } from './mail-folders/new-mail/new-mail.component';
import { DraftsComponent } from "./mail-folders/drafts/drafts.component";
import { InboxComponent } from "./mail-folders/inbox/inbox.component";
import { OpenMailComponent } from "./mail-folders/open-mail/open-mail.component";
import { SentComponent } from "./mail-folders/sent/sent.component";
import { TrashComponent } from "./mail-folders/trash/trash.component";
import { TodoComponent } from "./mail-folders/todo/todo.component";

@NgModule({
  imports: [
    CommonModule,
    AppLayoutsRoutingModule,
    SharedModule
  ],
  declarations: [
    AppLeftNavComponent,
    NewMailComponent,
    OpenMailComponent,
    InboxComponent,
    SentComponent,
    TrashComponent,
    DraftsComponent,
    TodoComponent
  ],
  exports: [
    AppLeftNavComponent
  ],
  entryComponents: [NewMailComponent]
})
export class FeatureModule {}
