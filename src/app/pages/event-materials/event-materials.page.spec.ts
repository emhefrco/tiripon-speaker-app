import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMaterialsPage } from './event-materials.page';

describe('EventMaterialsPage', () => {
  let component: EventMaterialsPage;
  let fixture: ComponentFixture<EventMaterialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMaterialsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMaterialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
