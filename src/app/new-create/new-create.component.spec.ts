import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCreateComponent } from './new-create.component';

describe('NewCreateComponent', () => {
  let component: NewCreateComponent;
  let fixture: ComponentFixture<NewCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
