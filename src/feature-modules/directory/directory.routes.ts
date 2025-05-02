import { CustomRouter } from "../../routes/custom.router";
import { Route } from "../../routes/routes.types";
import { ResponseHandler } from "../../utility/response-handler";
import { validate } from "../../utility/validate";
import directoryServices from "./directory.services";
import { Directory, GetDirs, ZDirectory, ZGetDirs } from "./directory.types";

const router = CustomRouter()

// Root Directory of Currently Logged in user
router.get('/root', null, async (req, res, next) => {
  try {
    const params: GetDirs = {
      user_id: req.payload.id,
      parent_id: null
    }
    const result = await directoryServices.getDirs(params);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}, { is_protected: true, has_Access: ['USER'] });

// Root Directory of some user only can be done by admin
router.get('/root/:user_id', null, async (req, res, next) => {
  try {
    const params: GetDirs = {
      user_id: req.params.user_id,
      parent_id: null
    }
    const result = await directoryServices.getDirs(params);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}, { is_protected: true, has_Access: ['ADMIN'] });

// any level of nested Directory of any user Logged in user
router.get('/:parent_id', null, async (req, res, next) => {
  try {
    const parent_id = req.params.parent_id

    const result = await directoryServices.getDirs({ parent_id });
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}, { is_protected: true, has_Access: ['USER', 'ADMIN'] });

router.get('/', null, async (req, res, next) => {
  try {
    const user_id = req.query.user as string;
    const parent_id = req.query.parent as string || null;

    const result = await directoryServices.getDirs({ user_id, parent_id });
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}, { is_protected: true, has_Access: ['ADMIN'] });

router.post("/", [validate(ZDirectory, 'body')], async (req, res, next) => {
  try {
    const body: Directory = {
      ...req.body,
      user_id: req.payload.id
    }
    const result = await directoryServices.create(body);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}, { is_protected: true, has_Access: ['USER'] });

router.delete('/:id', null, async (req, res, next) => {
  try {
    const result = await directoryServices.deleteDir(req.params.id);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}, { is_protected: true, has_Access: ['USER'] });

export default new Route("/directory", router.ExressRouter);