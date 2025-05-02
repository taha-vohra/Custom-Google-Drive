import { Route } from "../../routes/routes.types";
import roleServices from "./role.services";
import { ResponseHandler } from "../../utility/response-handler";
import { CustomRouter } from "../../routes/custom.router";
import { validate } from "../../utility/validate";
import { ZRole } from "./role.types";

const router = CustomRouter();

// router.get("/", null, async (req, res, next) => {
//   try {
//     const result = await roleServices.getAllRoles();
//     res.send(new ResponseHandler(result));
//   } catch (e) {
//     next(e);
//   }
// }, { is_protected: true });

router.post("/", [validate(ZRole, 'body')], async (req, res, next) => {
  try {
    const result = await roleServices.create(req.body);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}, { is_protected: true });

export default new Route("/role", router.ExressRouter);