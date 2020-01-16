import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NdviGraphComponent } from './ndvi-graph.component';

describe('NdviGraphComponent', () => {
  let component: NdviGraphComponent;
  let fixture: ComponentFixture<NdviGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NdviGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NdviGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
