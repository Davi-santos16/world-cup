import { MatchController } from "@/controller/match.controller";
import { Router } from "express";

const matchRoutes = Router();
const matchController = new MatchController();

matchRoutes.get("/", matchController.index);
matchRoutes.get("/rodada/:numero", matchController.showByRound);
matchRoutes.post("/", matchController.create);
matchRoutes.patch("/:id/resultado", matchController.updateResult);

export { matchRoutes };
