export const DirectoryResponses = {
  DIRECTORY_NOT_FOUND: {
      status: 404,
      message: 'DIRECTORY NOT FOUND'
  },
  DIRECTORY_CREATION_FAILED: {
      status: 500,
      message: 'DIRECTORY COULD NOT BE CREATED'
  },
  DIRECTORY_CREATED: {
      status: 201,
      message: 'DIRECTORY CREATED SUCCESSFULLY'
  },
  DIRECTORY_DELETION_FAILED: {
      status: 500,
      message: 'DIRECTORY COULD NOT BE DELETED'
  },
  DIRECTORY_DELETED: {
      status: 200,
      message: 'DIRECTORY DELETED SUCCESSFULLY'
  }
}