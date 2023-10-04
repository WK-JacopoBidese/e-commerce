import { Application } from "express";
import { CommonRoutesConfig } from "../shared/classes/CommonRoutesConfig";
import * as Users from "./controllers/user.controller";
import { body } from "express-validator";
import bodyValidationMiddleware from "../shared/middlewares/body.validation.middleware";
import userValidationMiddleware from "./middlewares/user.validation.middleware";
import mongodbValidationMiddleware from "../shared/middlewares/mongodb.validation.middleware";
import authMiddleware from "../auth/middlewares/auth.middleware";

export default class UserRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, "UserRoutes", "/v1/users");
    }

    configureRoutes(): Application {
        this.app.route(this.apiPrefix + "/:id")
            .all(
                authMiddleware.verifyToken
            )
            .get(
                mongodbValidationMiddleware.isMongoId,
                userValidationMiddleware.userExists,
                Users.findOne
            )
            .put(
                mongodbValidationMiddleware.isMongoId,
                userValidationMiddleware.userExists,
                body("username").isString().optional({ values: "null" }),
                body("email").isEmail().optional({ values: "null" }),
                body("password").isLength({ min: 6 }).optional({ values: "null" }),
                userValidationMiddleware.userEmailExists,
                bodyValidationMiddleware.verifyBodyFieldsError,
                Users.update
            )
            .delete(
                mongodbValidationMiddleware.isMongoId,
                userValidationMiddleware.userExists,
                Users.remove
            )

        this.app.route(this.apiPrefix)
            .all(
                authMiddleware.verifyToken
            )
            .post(
                body("username").isString().withMessage("Il campo username è obbligatorio e deve essere una stringa."),
                body("email").isEmail().withMessage("Il campo email è obbligatorio e deve essere una stringa."),
                body("password").isLength({ min: 6 }),
                userValidationMiddleware.userEmailExists,
                bodyValidationMiddleware.verifyBodyFieldsError,
                Users.create
            )
            .get(Users.findAll)

        return this.app;
    }
}