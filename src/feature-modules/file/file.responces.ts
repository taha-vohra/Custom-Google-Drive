export const FileResponses = {
  FILE_NOT_FOUND: {
      status: 404,
      message: 'FILE NOT FOUND'
  },
  FILE_UPLOAD_FAILED: {
      status: 500,
      message: 'FILE COULD NOT BE UPLOADED'
  },
  FILE_UPLOADED: {
      status: 201,
      message: 'FILE UPLOADED SUCCESSFULLY'
  },
  FILE_DELETION_FAILED: {
      status: 500,
      message: 'FILE COULD NOT BE DELETED'
  },
  FILE_DELETED: {
      status: 200,
      message: 'FILE DELETED SUCCESSFULLY'
  }
}