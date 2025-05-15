import express from "express";
import examRoutes from "./routes/examRoutes";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// app.use(
//  cors({
//   origin: "http://localhost:8080",
//  }),
// );

app.use("/api", examRoutes);

export default app;
