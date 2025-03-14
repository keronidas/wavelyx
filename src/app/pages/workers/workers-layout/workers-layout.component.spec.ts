import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersLayoutComponent } from './workers-layout.component';

describe('WorkersLayoutComponent', () => {
  let component: WorkersLayoutComponent;
  let fixture: ComponentFixture<WorkersLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkersLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkersLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
