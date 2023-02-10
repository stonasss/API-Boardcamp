import { Router } from "express";
import { getCustomerById, getCustomers, postCustomers } from "../controllers/customers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { customersSchema } from "../schemas/customersSchema.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.post("/customers", validateSchema(customersSchema), postCustomers);

export default customersRouter;
