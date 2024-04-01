import express from "express";
import authMiddleware from "./middleware/auth.js";
import UserRouter from "./router/userRouter.js";

import cors from "cors";

import dotenv from "dotenv";
//For env File
dotenv.config();

const app: express.Application = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(
    cors({
        origin: "*",
        credentials: true,
        optionsSuccessStatus: 200,
        methods: "GET, PUT, POST,DELETE",
    })
);
app.set("json spaces", 2);

// xác thực
app.use(authMiddleware.authorizationRequest);

app.get("/", (req: express.Request, res: express.Response) => {
    res.send(`Welcome to Express & TypeScript Server `);
});
app.use("/api/user", UserRouter);

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
