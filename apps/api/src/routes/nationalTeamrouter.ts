import { NationalTeam } from "@/controller/nationalTeam.controller";
import { Router } from "express";


const NationalteamRoutes = Router();
const NationlteamController = new NationalTeam();

NationalteamRoutes.get("/", NationlteamController.index);
NationalteamRoutes.get("/:letra", NationlteamController.showByGroup);

export { NationalteamRoutes };
