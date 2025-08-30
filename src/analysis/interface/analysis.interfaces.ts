export interface StackData {
  stackId: number;
  stackName: string;
  count: number;
}

export interface TechStackAnalysis {
  supply: StackData[];
  demand: StackData[];
}
