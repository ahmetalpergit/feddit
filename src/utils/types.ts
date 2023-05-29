export interface Fact {
  id: number;
  text: string;
  source: string;
  category: string;
  votes: {
    interesting: number;
    shocking: number;
    report: number;
  };
}
