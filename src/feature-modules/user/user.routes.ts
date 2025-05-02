import { NextFunction, Request, Response } from "express";
import { CustomRouter } from "../../routes/custom.router";
import userService from "./user.service";
import { Route } from "../../routes/routes.types";
import { ZPage, ZUpdate } from "./user.types";
import { validate } from "../../utility/validate";
import { ResponseHandler } from "../../utility/response-handler";

const router = CustomRouter();

router.get("/", null, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.findOneWithID(req.payload.id)
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}, { is_protected: true, has_Access: ["USER", 'ADMIN'] });

router.get("/all/", null, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getAll()
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}, { is_protected: true, has_Access: ['ADMIN'] });

router.get("/search/:term", null, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.search(req.params.term)
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}, { is_protected: true, has_Access: ['ADMIN'] });

router.delete("/:id", null, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.deleteUser(req.params.id)
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}, { is_protected: true, has_Access: ['ADMIN'] });

router.put("/", [validate(ZUpdate, 'body')], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.update(req.body)
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}, { is_protected: true, has_Access: ["USER", 'ADMIN'] });

export default new Route("/user", router.ExressRouter);