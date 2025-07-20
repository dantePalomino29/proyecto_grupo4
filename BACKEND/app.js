import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import api from "./routes.js";

const corsOption = {
  origin: "https://amazon.store.com/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use("/api/v1", api);

export default app;
