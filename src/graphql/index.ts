import { RegisterResolver } from "./User/register/RegisterResolver";
import { LoginResolver } from "./User/login/LoginResolver";
import { MeResolver } from "./User/me/MeResolver";
import { RealtimeResolver } from "./Weather/realtime/RealtimeResolver";

const userResolvers = [RegisterResolver, LoginResolver, MeResolver] as const;

const weatherResolvers = [RealtimeResolver] as const;

const customResolvers = [...userResolvers, ...weatherResolvers] as const;

export {
  customResolvers,
  userResolvers,
  weatherResolvers,
  RegisterResolver,
  LoginResolver,
  MeResolver,
  RealtimeResolver,
};
