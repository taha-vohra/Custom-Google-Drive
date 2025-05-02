import fileServices from "../file/file.services"
import directoryRepo from "./directory.repo"
import { DirectoryResponses } from "./directory.responces"
import { Directory, GetDirs } from "./directory.types"

const getDirs = async (getDirs: GetDirs) => {
	try {
		const files = await fileServices.getFiles({ parent_id: getDirs.parent_id })
		const folders = (await (directoryRepo.getDirs(getDirs))).map(e => e.dataValues);

		return [...folders, ...files];
	} catch (e) {
		throw DirectoryResponses.DIRECTORY_NOT_FOUND
	}
}

const create = async (directory: Directory) => {
	try {
		const result = await directoryRepo.create(directory)
		return DirectoryResponses.DIRECTORY_CREATED
	} catch (e) {
		throw DirectoryResponses.DIRECTORY_CREATION_FAILED
	}
}

const deleteDir = async (id: string) => {
	try {
		const result = await directoryRepo.deleteDir(id)
		const Fileresult = await fileServices.deleteFiles({ parent_id: id })
		return DirectoryResponses.DIRECTORY_DELETED
	} catch (e) {
		throw DirectoryResponses.DIRECTORY_DELETION_FAILED
	}
}

export default {
	create,
	deleteDir,
	getDirs
}