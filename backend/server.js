import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

connectDB();

const app = express();   // ✅ FIRST create app

app.use(cors());         // ✅ Then use middleware
app.use(express.json());

app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);
connectDB();


app.listen(5001, () => {
  console.log("Server started on PORT: 5001");
});

