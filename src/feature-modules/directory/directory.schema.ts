import { DataTypes, Model } from "sequelize";
import { Directory } from "./directory.types";
import { sequelize } from "../../connections/pg.connection";
import { UserSchema } from "../user/user.schema";

export class DirectorySchema extends Model<Directory, Directory> { }

DirectorySchema.init({
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
  }
}, {
  modelName: 'Directory',
  tableName: 'Directory',
  sequelize
});