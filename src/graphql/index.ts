import { RegisterResolver } from "./User/register/RegisterResolver";
import { LoginResolver } from "./User/login/LoginResolver";
import { MeResolver } from "./User/me/MeResolver";

const customResolvers = [RegisterResolver, LoginResolver, MeResolver] as const;

export { customResolvers, RegisterResolver, LoginResolver, MeResolver };
