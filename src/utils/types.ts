export interface IFact {
  id?: number;
  createdAt?: Date;
  text: string;
  source: string;
  category: string;
  votes: {
    interesting: number;
    shocking: number;
    report: number;
  };
}
