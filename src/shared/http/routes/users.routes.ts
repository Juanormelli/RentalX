import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "../../../modules/accounts/usecases/createUser/CreateUserController";
import uploadConfig from "../../../config/upload";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { UpdateUserAvatarController } from "../../../modules/accounts/usecases/updateUserAvatar/UpdateUserAvatarController";
import { ProfileUserController } from "../../../modules/accounts/usecases/profileUser/ProfileUserController";

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

userRoutes.post("/", createUserController.handle);

userRoutes.patch("/avatar",ensureAuthenticated,uploadAvatar.single("avatar"), updateUserAvatarController.handle)

userRoutes.get("/profile",ensureAuthenticated,profileUserController.handle)

export { userRoutes };
