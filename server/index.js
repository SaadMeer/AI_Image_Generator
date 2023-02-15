import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongoDB/connect.js";
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello From DALL-E");
});


const PORT = 8080;
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Server has started on Port:${PORT}`);
    });
  } catch (err) {
    console.log(err)
  }
};

startServer();
