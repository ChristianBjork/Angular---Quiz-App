import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesDisplayComponent } from './quizzes-display.component';

describe('QuizzesDisplayComponent', () => {
  let component: QuizzesDisplayComponent;
  let fixture: ComponentFixture<QuizzesDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
