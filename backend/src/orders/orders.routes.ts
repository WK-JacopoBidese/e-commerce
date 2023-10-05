import { Application } from "express";
import { CommonRoutesConfig } from "../shared/classes/CommonRoutesConfig";
import * as Orders from "./controllers/order.controller";
import { body } from "express-validator";
import bodyValidationMiddleware from "../shared/middlewares/body.validation.middleware";
import orderValidationMiddleware from "./middlewares/order.validation.middleware";
import mongodbValidationMiddleware from "../shared/middlewares/mongodb.validation.middleware";
import authMiddleware from "../auth/middlewares/auth.middleware";
import { orderStates } from "./enums/order.enums";

export default class OrderRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, "OrderRoutes", "/v1/orders");
    }

    configureRoutes(): Application {
        // this.app.route(this.apiPrefix + "/:id/lines/:id1")
        //     .all(
        //         authMiddleware.verifyToken,
        //         mongodbValidationMiddleware.isMongoId,
        //         mongodbValidationMiddleware.isMongoIdSub
        //     )
        //     .put(
        //         orderValidationMiddleware.orderExists,
        //         orderValidationMiddleware.orderLineExists,
        //         // body("userId").not().exists(),
        //         // body("date").isDate().optional({ values: "null" }),
        //         // body("state").isIn(orderStates).optional({ values: "null" }),
        //         // body("lines").not().exists(),
        //         bodyValidationMiddleware.verifyBodyFieldsError,
        //         Orders.updateLine
        //     )
        //     .delete(
        //         orderValidationMiddleware.orderExists,
        //         orderValidationMiddleware.orderLineExists,
        //         Orders.removeLine
        //     )
        //     .get(Orders.findOneLine)

        this.app.route(this.apiPrefix + "/:id/lines")
            .all(
                authMiddleware.verifyToken,
                mongodbValidationMiddleware.isMongoId
            )
            // .post(
            //     orderValidationMiddleware.orderExists,
            //     // body("userId").isMongoId().withMessage("Il campo userId è obbligatorio e deve essere un ID di MongoDB."),
            //     // body("date").default(new Date().toJSON().slice(0, 10)).isDate(),
            //     // body("state").default("created").isIn(orderStates),
            //     // body("lines").isArray({ min: 1 }),
            //     // body("lines.*.riga").default(1).isInt(),
            //     // body("lines.*.productId").isMongoId(),
            //     // body("lines.*.qta").default(1).isNumeric(),
            //     // body("lines.*.price").default(0).isNumeric(),
            //     bodyValidationMiddleware.verifyBodyFieldsError,
            //     Orders.createLine
            // )
            .get(
                orderValidationMiddleware.orderExists,
                Orders.findAllLines
            )

        this.app.route(this.apiPrefix + "/:id")
            .all(
                authMiddleware.verifyToken,
                mongodbValidationMiddleware.isMongoId
            )
            .get(
                orderValidationMiddleware.orderExists,
                Orders.findOne
            )
            .put(
                orderValidationMiddleware.orderExists,
                body("userId").not().exists(),
                body("date").isDate().optional({ values: "null" }),
                body("state").isIn(orderStates).optional({ values: "null" }),
                body("lines").not().exists(),
                bodyValidationMiddleware.verifyBodyFieldsError,
                Orders.update
            )
            .delete(
                orderValidationMiddleware.orderExists,
                Orders.remove
            )

        this.app.route(this.apiPrefix)
            .all(
                authMiddleware.verifyToken
            )
            .post(
                body("userId").isMongoId().withMessage("Il campo userId è obbligatorio e deve essere un ID di MongoDB."),
                body("date").default(new Date().toJSON().slice(0, 10)).isDate(),
                body("state").default("created").isIn(orderStates),
                body("lines").isArray({ min: 1 }),
                body("lines.*.riga").default(1).isInt(),
                body("lines.*.productId").isMongoId(),
                body("lines.*.qta").default(1).isNumeric(),
                body("lines.*.price").default(0).isNumeric(),
                bodyValidationMiddleware.verifyBodyFieldsError,
                Orders.create
            )
            .get(Orders.findAll)

        return this.app;
    }
}