import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCrudComponent } from './event-crud.component';

describe('EventCrudComponent', () => {
  let component: EventCrudComponent;
  let fixture: ComponentFixture<EventCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
