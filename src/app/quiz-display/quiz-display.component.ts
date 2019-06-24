import { Component, OnInit } from '@angular/core';
import { Quiz, Question, Option} from '../entities/quiz';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-quiz-display',
  templateUrl: './quiz-display.component.html',
  styleUrls: ['./quiz-display.component.css']
})

export class QuizDisplayComponent implements OnInit {

  quizzes: Quiz[];
  quiz: Quiz = new Quiz();
  selectedAnswer: string;
  currentUserName: string;
  currentQuestion: Question;
  i: number = 1;
  isNextQuiz: boolean = true;
  correctAnswers: number = 0;
  showResult: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private ngRedux: NgRedux<AppState>
    ) { }
 
  
  ngOnInit() {


    // get the state of all quizzes
    this.ngRedux.select(state => state.quizzes).subscribe(res => {
      this.quizzes = res.quizzes;
    });

    // get the state of the currentUser
    this.ngRedux.select(state => state.users.currentUser).subscribe(res => {
      this.currentUserName = res.username;
    })

    // store url id in id variable
    const id = this.route.snapshot.paramMap.get('id');

    // store the quiz with the url id into new quiz object
    this.quiz = this.quizzes.find(q => q._id === id);
    
    this.currentQuestion = this.quiz.questions[0];
    if (this.quiz.questions[this.i] == undefined) {
      this.isNextQuiz = false
    }
  
  }

 

  onNextQuiz() {
    console.log(this.selectedAnswer)

    const validateOption = this.currentQuestion.options.find(sQ => sQ.answer === this.selectedAnswer)
    if(validateOption.answer == this.selectedAnswer && validateOption.correct == true) {
      this.correctAnswers += 1;
      console.log(this.correctAnswers)
    }

    if(this.quiz.questions[this.i] != undefined) {
      this.currentQuestion = this.quiz.questions[this.i];
      this.i += 1

      


      if (this.quiz.questions[this.i] != undefined) {
        this.isNextQuiz = false

  
      }
    }
    else {
      this.isNextQuiz = false
    }

  }

  onShowResult() {
    
    this.showResult = true;
  }

  
  


}
