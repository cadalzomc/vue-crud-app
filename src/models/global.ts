export interface IComment {
  by: string;
  comment: string;
  date: string;
}

export interface ITopic {
  guid: string;
  name: string;
  comments: IComment[];
}
