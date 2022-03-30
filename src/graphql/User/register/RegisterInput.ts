import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./validators/isEmailAlreadyExist";
import { IsUserAlreadyExist } from "./validators/isUserAlreadyExist";

@InputType()
export class RegisterInput {
  @Field()
  @IsUserAlreadyExist({ message: "Username already exists." })
  username: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email already in use." })
  email: string;

  @Field()
  @Length(6, 255)
  password: string;
}
