import * as dotenv from "dotenv";
import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL, // 예: https://너의프론트.vercel.app
  "http://localhost:3000", // 로컬 개발용
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // origin이 없는 경우(예: curl, 서버-서버 요청) 허용
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
  })
);

app.options("*", cors()); // preflight 대응(가끔 필요)

app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`${port}서버시작`));