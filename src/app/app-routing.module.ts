import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';

import { QuizPortalComponent } from './quiz-portal/quiz-portal.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { QuizDisplayComponent } from './quiz-display/quiz-display.component';
import { QuizzesDisplayComponent } from './quizzes-display/quizzes-display.component';
import { AuthGuard } from './auth/auth.guard';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
  // if baseUrl => go to ?
  {path: '', redirectTo:'home/welcome', pathMatch:"full"},

  {path: 'home', component: HomeComponent, children: [
    {path: 'about', component: AboutComponent },
    {path: 'welcome', component: WelcomeComponent },
    {path: 'login', component: LoginComponent },
    {path: 'user-registration', component: UserRegistrationComponent }
  ]},

  {path: 'quiz-portal', component: QuizPortalComponent, /*canActivate:[AuthGuard] ,*/children: [
    {path: 'quiz-create', component: QuizCreateComponent},
    {path: 'quiz-display/:id', component: QuizDisplayComponent},
    {path: 'quizzes-display', component: QuizzesDisplayComponent}

  ]},


  // Wildcard - If no routes matched
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
