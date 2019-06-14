import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';

import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatTableModule, MatProgressSpinnerModule, MatGridListModule, MatDividerModule, MatCheckboxModule } from '@angular/material';

import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { rootReducer, AppState } from './store';
import { QuizComponent } from './quiz/quiz.component';
import { QuizPortalComponent } from './quiz-portal/quiz-portal.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { QuizDisplayComponent } from './quiz-display/quiz-display.component';
import { QuizzesDisplayComponent } from './quizzes-display/quizzes-display.component';
import { QuizPipe } from './pipes/quiz.pipe';






@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    WelcomeComponent,
    LoginComponent,
    AboutComponent,
    QuizComponent,
    QuizPortalComponent,
    QuizCreateComponent,
    QuizDisplayComponent,
    QuizzesDisplayComponent,
    QuizPipe
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    

    NgReduxModule, NgReduxRouterModule.forRoot(),
    
    MatFormFieldModule, MatInputModule, MatButtonModule, 
    MatToolbarModule,MatMenuModule,MatIconModule, 
    MatProgressSpinnerModule, MatCardModule, MatDialogModule, 
    MatTableModule, MatGridListModule, MatDividerModule, 
    MatCheckboxModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private ngRedux: NgRedux<AppState>,
    private devTool: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter,) {
   
    // this.ngRedux.configureStore(rootReducer, {});
    this.ngRedux.configureStore(rootReducer, {}, [],[ devTool.isEnabled() ? devTool.enhancer() : f => f]);

     ngReduxRouter.initialize(/* args */);  
 
 
  }
}
