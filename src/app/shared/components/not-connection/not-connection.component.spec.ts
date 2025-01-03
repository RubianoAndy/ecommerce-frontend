import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotConnectionComponent } from './not-connection.component';

describe('NotConnectionComponent', () => {
  let component: NotConnectionComponent;
  let fixture: ComponentFixture<NotConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotConnectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
