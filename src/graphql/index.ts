import { RegisterResolver } from "./User/register/RegisterResolver";
import { LoginResolver } from "./User/login/LoginResolver";
import { MeResolver } from "./User/me/MeResolver";
import { RealtimeResolver } from "./Weather/realtime/RealtimeResolver";
import { ForecastResolver } from "./Weather/forecast/ForecastResolver";
import { AstronomyResolver } from "./Weather/astronomy/AstronomyResolver";

const userResolvers = [RegisterResolver, LoginResolver, MeResolver] as const;

const weatherResolvers = [RealtimeResolver, ForecastResolver, AstronomyResolver] as const;

const customResolvers = [...userResolvers, ...weatherResolvers] as const;

export {
  customResolvers,
  userResolvers,
  weatherResolvers,
  RegisterResolver,
  LoginResolver,
  MeResolver,
  RealtimeResolver,
  ForecastResolver,
  AstronomyResolver,
};
