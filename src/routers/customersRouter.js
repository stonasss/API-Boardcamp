import { Router } from "express";
import {
    getCustomerById,
    getCustomers,
    postCustomers,
    updateCustomer,
} from "../controllers/customers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { customersSchema } from "../schemas/customersSchema.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.post("/customers", validateSchema(customersSchema), postCustomers);
customersRouter.put("/customers/:id", validateSchema(customersSchema), updateCustomer);

export default customersRouter;
