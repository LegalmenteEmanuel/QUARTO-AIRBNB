import { Router } from "express"; //siempre en todos los archivos se importara esta libreria
import {
  login,
  register,
  refreshToken,
  logout,
  updateUser,
} from "../controllers/user.controller.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import {
  bodyLoginValidator,
  bodyRegisterValidator,
} from "../middlewares/validatorManagerAuth.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

//POST api/v1/user/login  iniciar seccion de usuario
//POST api/v1/user/register  registar usuario
//GET api/v1/user/refresh refresca el token de acceso al usuario
//GET api/V1/user/logout cierra la sesión al usuario
//PACTH api/v1/user/:id actualiza la informacion al usuario

router.post("/login", bodyLoginValidator, login);
router.post("/register", bodyRegisterValidator, register);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);
router.patch("/:id", requireToken, updateUser);

export default router;
