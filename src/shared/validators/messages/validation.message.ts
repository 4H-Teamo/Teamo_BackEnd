import { ValidationArguments } from 'class-validator';

export const IntValidationMessage = (args: ValidationArguments) => {
  return `${args.property}에는 정수가 들어갑니다.`;
};

export const PositiveIntValidationMessage = (args: ValidationArguments) => {
  return `${args.property}에는 1 이상의 정수가 들어가야합니다.`;
};

export const StringValidationMessage = (args: ValidationArguments) => {
  return `${args.property}에 문자열이 들어가야 합니다.`;
};

export const DateValidationMessage = (args: ValidationArguments) => {
  return `${args.property}에 ISO 형식의 문자열이 들어가야합니다. date.toISOString()으로 변환 가능합니다.`;
};
