import { CustomRouter } from "../../routes/custom.router";
import { Route } from "../../routes/routes.types";
import { FileUpload } from "../../utility/multer.storage";
import { ResponseHandler } from "../../utility/response-handler";
import { validate } from "../../utility/validate";
import fileServices from "./file.services";
import directoryServices from "./file.services";
import { File, ZFile } from "./file.types";

const router = CustomRouter()
const uploadLocation = 'uploads/files/';
const upload = FileUpload(uploadLocation, {
  maxFileSize: 2,
  maxFiles: 1,
  allowedMimeTypes: ['image/jpeg', 'image/png'],
});

router.post("/", [upload.single('file')], async (req, res, next) => {
  try {
    if (!req.file) throw "File Not Found"
    const filePath = `${uploadLocation}${req.file.filename}`;

    const filePayload: File = {
      ...req.body,
      location: filePath,
      user_id: req.payload.id
    }

    const result = await fileServices.create(filePayload);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}, { is_protected: true, has_Access: ['USER'] });

router.post("/root", [upload.single('file')], async (req, res, next) => {
  try {
    if (!req.file) throw "File Not Found"
    const filePath = `${uploadLocation}${req.file.filename}`;

    const filePayload: File = {
      ...req.body,
      location: filePath,
      user_id: req.payload.id,
      parent_id: null
    }

    const result = await fileServices.create(filePayload);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}, { is_protected: true, has_Access: ['USER'] });

router.delete('/:id', null, async (req, res, next) => {
  try {
    const result = await directoryServices.deleteFiles({ id: req.params.id });
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}, { is_protected: true, has_Access: ['USER'] });

export default new Route("/file", router.ExressRouter);