export interface StackDataInterface {
  stackId: number;
  stackName: string;
  count: number;
}

export interface TechStackAnalysisInterface {
  supply: StackDataInterface[];
  demand: StackDataInterface[];
}
