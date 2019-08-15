import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventChatPage } from './event-chat.page';

describe('EventChatPage', () => {
  let component: EventChatPage;
  let fixture: ComponentFixture<EventChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
