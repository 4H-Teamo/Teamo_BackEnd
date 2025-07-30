import { ValidationArguments } from 'class-validator';

// TODO : workMode, positions, stacks에 변경이 있다면 수정해야함.
export const WorkModeValidationMessage =
  'workMode는 1이상 3이하의 숫자입니다. (1: 온라인, 2: 오프라인, 3: 무관)';

// 배열
export const StringArrayValidationMessage = (args: ValidationArguments) => {
  return `${args.property}에 문자열 배열이 들어가야 합니다.`;
};

export const IntArrayValidationMessage = (args: ValidationArguments) => {
  return `${args.property}에 정수 배열이 들어가야 합니다.`;
};

export const ArrayEmptyValidationMessage = (args: ValidationArguments) => {
  return `${args.property} 배열은 비어 있을 수 없습니다.`;
};

// 숫자
export const IntValidationMessage = (args: ValidationArguments) => {
  return `${args.property}에는 정수가 들어갑니다.`;
};

export const PositiveIntValidationMessage = (args: ValidationArguments) => {
  return `${args.property}에는 1 이상의 정수가 들어가야합니다.`;
};

export const MaxIntValidationMessage = (args: ValidationArguments) => {
  return `${args.property}에는 ${args.constraints[0]} 이하의 숫자가 들어가야합니다.`;
};

// 문자열
export const StringValidationMessage = (args: ValidationArguments) => {
  return `${args.property}에 문자열이 들어가야 합니다.`;
};

// 날짜
export const DateValidationMessage = (args: ValidationArguments) => {
  return `${args.property}에 ISO 형식의 문자열이 들어가야합니다. date.toISOString()으로 변환 가능합니다.`;
};

export const BooleanValidationMessage = (args: ValidationArguments) => {
  return `${args.property}에는 true 또는 false가 들어가야 합니다.`;
};
