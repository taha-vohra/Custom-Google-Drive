import { FileSchema } from "./file.schema";
import { File, GetFiles } from "./file.types";

const create = (file: File) => FileSchema.create(file)

const getFile = (file: Partial<File>) => FileSchema.findOne({ where: file })

const getFiles = (getDirs: GetFiles) => FileSchema.findAll({ where: getDirs })

const deleteFile = (file: Partial<File>) => FileSchema.destroy({ where: file })

export default {
  create,
  getFile,
  getFiles,
  deleteFile
}