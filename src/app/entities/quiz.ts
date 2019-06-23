import { User } from './user';

export class Quiz {
  _id: string;
  visible: boolean;
  user: User; 
  title: string;
  created?: Date; // ? = optional field
  questions: Question[]; 
  ratings?: Rating[];
  customerId?: string;
  like?: number;
}
export class Question {
  title: string;
  options: Option[];
}
export class Option {
  answer: string;
  correct: boolean;
}
export class Rating {
  grade: number;
  user: User;
  // timestamp: Date;
  // title: string;
  // message: string;
}