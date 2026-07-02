import { Router } from "express";
import { NationalteamRoutes } from "./nationalTeamrouter";
import { standingsRoutes } from "./standings.router";
import { matchRoutes } from "./match.router";

const routes = Router()

routes.use("/team", NationalteamRoutes)
routes.use("/classificacao", standingsRoutes)
routes.use("/partidas", matchRoutes)


export {routes}
