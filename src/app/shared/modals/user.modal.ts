export interface User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface Answered {
  quesid?: string;
  question?: string;
  userID?: string;
  ansers?: answers[];
}

export interface answers {
  ansID?: string;
  answeredUserID?: string;
  answer?: string;
}
