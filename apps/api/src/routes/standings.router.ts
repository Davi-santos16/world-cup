import { StandingsController } from "@/controller/standings.controller";
import { Router } from "express";

const standingsRoutes = Router();
const standingsController = new StandingsController();

standingsRoutes.get("/:grupo", standingsController.show);

export { standingsRoutes };
