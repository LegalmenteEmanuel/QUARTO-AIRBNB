import "dotenv/config";
import "./database/connectdb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import userRouter from "./routes/user.routes.js";
import typeRoomRouter from "./routes/typeRoom.routes.js";
import dataRoomRouter from "./routes/dataRoom.routes.js";
import benefitRouter from "./routes/benefit.routes.js";
import categoryRouter from "./routes/category.routes.js";
import propertyRouter from "./routes/property.routes.js";
import reviewRouter from "./routes/review.routes.js"
import rentRouter from "./routes/rent.routes.js"

const app = express();
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback("Error de CORS origin: " + origin + " No autorizado!");
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/typeroom", typeRoomRouter);
app.use("/api/v1/dataroom", dataRoomRouter);
app.use("/api/v1/benefit", benefitRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/property", propertyRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/rent", rentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log("servidor activado en http://localhost:" + PORT)
);
