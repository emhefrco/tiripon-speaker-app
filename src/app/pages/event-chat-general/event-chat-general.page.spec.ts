import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventChatGeneralPage } from './event-chat-general.page';

describe('EventChatGeneralPage', () => {
  let component: EventChatGeneralPage;
  let fixture: ComponentFixture<EventChatGeneralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventChatGeneralPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventChatGeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
