import authRoutes from "../feature-modules/auth/auth.routes";
import directoryRoutes from "../feature-modules/directory/directory.routes";
import fileRoutes from "../feature-modules/file/file.routes";
import roleRoutes from "../feature-modules/role/role.routes";
import userRoutes from "../feature-modules/user/user.routes";
import { Routes } from "./routes.types";

export const routes: Routes = [
  roleRoutes,
  userRoutes,
  authRoutes,
  directoryRoutes,
  fileRoutes
];