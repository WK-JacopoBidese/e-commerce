import { Application } from "express";
import { CommonRoutesConfig } from "../shared/classes/CommonRoutesConfig";
import bodyValidationMiddleware from "../shared/middlewares/body.validation.middleware";
import { login } from "./controllers/auth.controller";
import { body } from "express-validator";

export default class AuthRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, "AuthRoutes", "/v1/login");
    }

    configureRoutes(): Application {
        this.app.route(this.apiPrefix)
            .post(
                body("email").isEmail().withMessage("Il campo email è obbligatorio e deve essere una stringa."),
                body("password").isLength({ min: 6 }).withMessage("Il campo password è obbligatorio."),
                bodyValidationMiddleware.verifyBodyFieldsError,
                login
            )

        return this.app;
    }
}