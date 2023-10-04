import { Application } from "express";
import { CommonRoutesConfig } from "../shared/classes/CommonRoutesConfig";
import * as Users from "./controllers/user.controller";
import { body } from "express-validator";
import bodyValidationMiddleware from "../shared/middlewares/body.validation.middleware";
import userValidationMiddleware from "./middlewares/user.validation.middleware";
import mongodbValidationMiddleware from "../shared/middlewares/mongodb.validation.middleware";
import authMiddleware from "../auth/middlewares/auth.middleware";
import { userRoles } from "./enums/user.enums";

export default class UserRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, "UserRoutes", "/v1/users");
    }

    configureRoutes(): Application {
        this.app.route(this.apiPrefix + "/:id")
            .all(
                authMiddleware.verifyToken,
                mongodbValidationMiddleware.isMongoId
            )
            .get(
                userValidationMiddleware.userExists,
                Users.findOne
            )
            .put(
                userValidationMiddleware.userExists,
                body("username").isString().optional({ values: "null" }),
                body("email").isEmail().optional({ values: "null" }),
                body("password").isLength({ min: 6 }).optional({ values: "null" }),
                body("pec").isEmail().optional({ values: "null" }),
                body("sdi").isLength({ min: 7, max: 7 }).optional({ values: "null" }),
                body("ruolo").isIn(userRoles).optional({ values: "null" }),
                body("indirizzoFatt.provincia").isLength({ min: 2, max: 2 }).optional({ values: "null" }),
                body("indirizzoFatt.nazione").isLength({ min: 2, max: 2 }).optional({ values: "null" }),
                body("indirizzoSped.provincia").isLength({ min: 2, max: 2 }).optional({ values: "null" }),
                body("indirizzoSped.nazione").isLength({ min: 2, max: 2 }).optional({ values: "null" }),
                userValidationMiddleware.userEmailExists,
                bodyValidationMiddleware.verifyBodyFieldsError,
                Users.update
            )
            .delete(
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
                body("pec").isEmail().optional({ values: "null" }),
                body("sdi").isLength({ min: 7, max: 7 }).optional({ values: "null" }),
                body("ruolo").default("user").isIn(userRoles),
                body("indirizzoFatt.provincia").isLength({ min: 2, max: 2 }).optional({ values: "null" }),
                body("indirizzoFatt.nazione").isLength({ min: 2, max: 2 }).optional({ values: "null" }),
                body("indirizzoSped.provincia").isLength({ min: 2, max: 2 }).optional({ values: "null" }),
                body("indirizzoSped.nazione").isLength({ min: 2, max: 2 }).optional({ values: "null" }),
                userValidationMiddleware.userEmailExists,
                bodyValidationMiddleware.verifyBodyFieldsError,
                Users.create
            )
            .get(Users.findAll)

        return this.app;
    }
}