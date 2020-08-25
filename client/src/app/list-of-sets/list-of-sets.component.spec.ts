import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSetsComponent } from './list-of-sets.component';

describe('ListOfSetsComponent', () => {
  let component: ListOfSetsComponent;
  let fixture: ComponentFixture<ListOfSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
