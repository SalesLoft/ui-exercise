import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
  AccordionModule,
  ButtonsModule,
  ModalModule,
  PaginationModule,
  PopoverModule,
  SortableModule,
  TabsModule,
  TooltipModule
} from "ngx-bootstrap";

import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material';

import { CollapsibleColumnService } from "./services/collapsible-column.service";
import { DataService } from "./services/data.service";
import { MailService } from "./services/mail.service";
import { ToDoService } from "./services/todo.service";
import { HighlightDirective } from './directives/highlight.directive';
import { HeaderPanelComponent } from "./components/header-panel/header-panel.component";
import { AppToggleCollapsibleDirective } from "./directives/app-toggle-collapsible/app-toggle-collapsible.directive";
import { AppClickOutsideDirective } from "./directives/app-click-outside/app-click-outside.directive";
import { AppTruncateTextDirective } from "./directives/app-truncate-text.directive";
import { FilterPipe } from "./pipe/filter.pipe";
import { SearchPipe } from "./pipe/search.pipe";
import { SortByPipe } from "./pipe/sort-by.pipe";
import { DateFormatPipe } from "./pipe/date-format.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatTabsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    SortableModule.forRoot(),
    ButtonsModule.forRoot(),
    NgbModule,
    DragDropModule
  ],
  declarations: [
    AppToggleCollapsibleDirective,
    AppTruncateTextDirective,
    HeaderPanelComponent,
    AppClickOutsideDirective,
    HighlightDirective,
    FilterPipe,
    SortByPipe,
    SearchPipe,
    DateFormatPipe
  ],
  exports: [
    AppToggleCollapsibleDirective,
    HeaderPanelComponent,
    AppClickOutsideDirective,
    AppTruncateTextDirective,
    HighlightDirective,
    MatDialogModule,
    BrowserAnimationsModule,
    MatTabsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    FilterPipe,
    SortByPipe,
    SearchPipe,
    DateFormatPipe,
    TooltipModule,
    PopoverModule,
    PaginationModule,
    SortableModule,
    ButtonsModule,
    TabsModule,
    AccordionModule,
    DragDropModule
  ],
  providers: [
  ],
  entryComponents: [
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        CollapsibleColumnService,
        MailService,
        DataService,
        ToDoService
      ]
    };
  }
}
