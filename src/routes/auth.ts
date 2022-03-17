import { Router } from "express";

const AuthRouter = Router();

AuthRouter.get(`/`, (req, res) => {
  res.json({
    message: "🔐",
  });
});

AuthRouter.post("/signup", (req, res) => {
  res.json({
    message: "✅",
  });
});

export default AuthRouter;
