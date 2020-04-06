import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLeftNavComponent } from './app-left-nav.component';

describe('AppLeftNavComponent', () => {
  let component: AppLeftNavComponent;
  let fixture: ComponentFixture<AppLeftNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLeftNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
