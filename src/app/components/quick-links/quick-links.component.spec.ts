import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickLinksComponent } from './quick-links.component';

describe('QuickLinksComponent', () => {
  let component: QuickLinksComponent;
  let fixture: ComponentFixture<QuickLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
