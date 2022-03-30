import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { prisma } from "../../../../context";

@ValidatorConstraint({ async: true })
export class EmailExist implements ValidatorConstraintInterface {
  async validate(email: string) {
    const user = await prisma.user.findFirst({ where: { email } });
    if (user) return false;
    return true;
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailExist,
    });
  };
}
