import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsPage } from './materials.page';

describe('MaterialsPage', () => {
  let component: MaterialsPage;
  let fixture: ComponentFixture<MaterialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
