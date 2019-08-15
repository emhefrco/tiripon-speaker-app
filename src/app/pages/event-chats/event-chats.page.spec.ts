import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventChatsPage } from './event-chats.page';

describe('EventChatsPage', () => {
  let component: EventChatsPage;
  let fixture: ComponentFixture<EventChatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventChatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventChatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
