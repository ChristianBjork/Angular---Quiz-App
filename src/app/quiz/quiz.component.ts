import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from '../entities/quiz';
import { QuizActions } from '../redux/quiz.actions';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  @Input() quizInput: Quiz;
  @Output() quizClicked: EventEmitter<Quiz> = new EventEmitter<Quiz>();
  quizzes: Quiz[];
  isLoading: boolean;
  isActive: boolean;
  currentUsername: string;

  constructor( 
    private quizActions: QuizActions,
    private ngRedux: NgRedux<AppState>,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
    ) { iconRegistry.addSvgIcon('thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-thumb_up-24px.svg'));
      }
    
   
    ngOnInit() { 

      // Get currentUser to display delete button if equal to Admin
      this.ngRedux.select(state => state.users.currentUser).subscribe(res => {
        this.currentUsername = res.username;
      })
    }
    
    // gets prompted if you want to delete a quiz
    deleteQuiz() {
      if(confirm("Are you sure your want to delete " + this.quizInput.title)){
      this.quizActions.deleteQuiz(this.quizInput);
    }
  }

  // stores the quiz clicked in a new quiz object
  emitQuizClicked() {
    this.quizClicked.emit(this.quizInput);
  }

  onClick() {
    // if like button is active -1 else +1
    this.quizInput.like += (this.isActive) ? -1 : 1;
    this.isActive = !this.isActive;

    // update like value in database
    this.quizActions.updateLike(this.quizInput);

    
  }

}
