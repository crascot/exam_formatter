import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import examRoutes from "./routes/examRoutes";
import geminiRouter from "./routes/gemini.routes";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// app.use(
//  cors({
//   origin: "http://localhost:8080",
//  }),
// );

app.use("/api", examRoutes);
app.use("/gemini-api", geminiRouter);

export default app;
