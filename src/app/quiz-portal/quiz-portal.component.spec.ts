import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPortalComponent } from './quiz-portal.component';

describe('QuizPortalComponent', () => {
  let component: QuizPortalComponent;
  let fixture: ComponentFixture<QuizPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
