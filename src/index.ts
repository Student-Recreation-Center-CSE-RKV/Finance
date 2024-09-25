import Express from "express";
import router from "./routes";
import connectDB from "./config/database";


const app = Express();
const { PORT } = require("./config/serverConfig");
var bodyParser = require("body-parser");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/uploads/data", Express.static("uploads/data"));

app.use("/api", router);




console.log(process.env.MONGODB_URI);
app.listen(PORT, async () => {
  console.log(`app listening at port ${PORT}`);
  await connectDB();
});
