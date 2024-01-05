import express from "express";
import cors from "cors";

const app = express();

app.use(cors);
app.use(express.json({
    limit:'10000kb',
}));
app.use(express.urlencoded(
    {extended: true,limit: "1000kb" }
));

export default app;