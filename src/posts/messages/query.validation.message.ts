import { ValidationArguments } from 'class-validator';

export const QueryIntValidationMessage = (args: ValidationArguments) => {
  return `${args.property}에는 정수가 들어갑니다.`;
};

export const QueryPositiveIntValidationMessage = (
  args: ValidationArguments,
) => {
  return `${args.property}에는 1 이상의 정수가 들어가야합니다.`;
};
