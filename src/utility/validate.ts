import { NextFunction, Request, Response } from "express";
import { Schema } from "zod";

export const validate = (schema: Schema, part: "body" | "params" | "query") => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { success, data, error } = schema.safeParse(req[part]);

            if (!success) throw { status: 400, error: error?.issues }

            req[part] = data;
            next();
        } catch (e) {
            next(e);
        }
    }
}