import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import UserRoutes from "./users/users.routes";
import { CommonRoutesConfig } from "./shared/classes/CommonRoutesConfig";
import ProductRoutes from "./products/products.routes";
import * as db from "./shared/db/db";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
const routes: CommonRoutesConfig[] = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

db.connectDb();

routes.push(new UserRoutes(app));
routes.push(new ProductRoutes(app));

app.listen(port, () => {
    console.log(`Il server è in ascolto sulla porta ${port}`);
});