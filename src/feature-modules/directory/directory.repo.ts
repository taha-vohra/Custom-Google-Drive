import { DirectorySchema } from "./directory.schema";
import { Directory, GetDirs } from "./directory.types";

const create = (directory: Directory) => DirectorySchema.create(directory)

const getDir = (id: string) => DirectorySchema.findOne({ where: { id } })

const getDirs = (getDirs: GetDirs) => DirectorySchema.findAll({ where: getDirs })

const deleteDir = (id: string) => DirectorySchema.destroy({ where: { id } })

export default {
  create,
  getDir,
  getDirs,
  deleteDir
}