import authService from "./auth.service";
import { NextFunction, Request, Response, Router } from "express";
import { validate } from "../../utility/validate";
import { ZCredentials, Credentials, ZCreateUser, CreateUser, ZChangePassWord } from "./auth.type";
import { User, ZUser } from "../user/user.types";
import { ResponseHandler } from "../../utility/response-handler";
import { CustomRouter } from "../../routes/custom.router";
import { Route } from "../../routes/routes.types";
import { Role, ZRole } from "../role/role.types";
import { generatePassword } from "../../utility/password.generator";

const router = CustomRouter();

router.post("/login", [validate(ZCredentials, "body")], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body as Credentials
        const result = await authService.login(body);
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
}, { is_protected: false });

router.post("/register", [validate(ZUser, 'body')], async (req, res, next) => {
    try {
        const body = req.body as User
        const result = await authService.register(body);
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
}, { is_protected: true });

router.post("/register/:role", [validate(ZCreateUser, 'body'), validate(ZRole, 'params')], async (req, res, next) => {
    try {
        const body = { ...req.body, password: generatePassword() } as User // send mails to the created user for there credentials
        const { role } = req.params as Role;
        if (role !== 'USER') next({ status: 400, message: "Admin Can Only Register a User" })

        const result = await authService.register(body, role);
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
}, { is_protected: true, has_Access: ["ADMIN"] });

router.put("/", [validate(ZChangePassWord, 'body')], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.update({ ...req.body, id: req.payload.id })
        res.send(result);
    } catch (e) {
        next(e);
    }
}, { is_protected: true, has_Access: ["USER", 'ADMIN'] });

export default new Route("/auth", router.ExressRouter);