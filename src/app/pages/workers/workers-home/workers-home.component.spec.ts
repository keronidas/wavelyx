import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersHomeComponent } from './workers-home.component';

describe('WorkersHomeComponent', () => {
  let component: WorkersHomeComponent;
  let fixture: ComponentFixture<WorkersHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkersHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
