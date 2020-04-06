import { NgModule, ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DraftsComponent } from "./mail-folders/drafts/drafts.component";
import { InboxComponent } from "./mail-folders/inbox/inbox.component";
import { OpenMailComponent } from "./mail-folders/open-mail/open-mail.component";
import { SentComponent } from "./mail-folders/sent/sent.component";
import { TrashComponent } from "./mail-folders/trash/trash.component";
import { TodoComponent } from "./mail-folders/todo/todo.component";


const routes: Routes = [
  { path: 'inbox', component: InboxComponent},
  { path: 'inbox/:id', component: OpenMailComponent },
  { path: 'sent', component: SentComponent },
  { path: 'sent/:id', component: OpenMailComponent },
  { path: 'drafts', component: DraftsComponent },
  { path: 'drafts/:id', component: OpenMailComponent },
  { path: 'trash', component: TrashComponent },
  { path: 'trash/:id', component: OpenMailComponent },
  { path: 'notes', component: TodoComponent },
  { path: '**', redirectTo: "/inbox", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppLayoutsRoutingModule {}
