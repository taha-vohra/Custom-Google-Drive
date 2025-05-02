import { Multer } from "multer";
import fileRepo from "./file.repo"
import { FileResponses } from "./file.responces"
import { File, GetFiles } from "./file.types"

const getFiles = async (getFiles: GetFiles) => {
	try {
		const result = await fileRepo.getFiles(getFiles);
		return result.map(e => e.dataValues);
	} catch (e) {
		throw FileResponses.FILE_NOT_FOUND
	}
}

const create = async (directory: File) => {
	try {
		const result = await fileRepo.create(directory)
		return FileResponses.FILE_UPLOADED
	} catch (e) {
		throw FileResponses.FILE_UPLOAD_FAILED
	}
}

const deleteFiles = async (file: Partial<File>) => {
	try {
		const result = await fileRepo.deleteFile(file)
		return FileResponses.FILE_DELETED
	} catch (e) {
		throw FileResponses.FILE_DELETION_FAILED
	}
}

export default {
	create,
	deleteFiles,
	getFiles
}