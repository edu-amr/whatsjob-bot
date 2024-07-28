import { Router } from "express";
import { RenderPages } from "./controllers/RenderPages";

const renderPages = new RenderPages()

export const router = Router()

router.get('/', renderPages.home);