import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectMessagePage } from './direct-message.page';

describe('DirectMessagePage', () => {
  let component: DirectMessagePage;
  let fixture: ComponentFixture<DirectMessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectMessagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
