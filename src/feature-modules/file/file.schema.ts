import { DataTypes, Model } from "sequelize";
import { File } from "./file.types";
import { sequelize } from "../../connections/pg.connection";
import { UserSchema } from "../user/user.schema";
import { DirectorySchema } from "../directory/directory.schema";

export class FileSchema extends Model<File, File> { }

FileSchema.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: UserSchema,
      key: 'id'
    },
    allowNull: false
  },
  parent_id: {
    type: DataTypes.UUID,
    references: {
      model: DirectorySchema,
      key: 'id'
    },
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  modelName: 'File',
  tableName: 'File',
  sequelize
});