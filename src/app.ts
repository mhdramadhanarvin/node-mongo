import express, { Request, Response } from "express";
import cors from "cors";
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

// Constants
const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";
const {
  MONGODB_CLOUD,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_DBNAME,
} = process.env;
// const uri = "mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@clustertodo.dxefu.mongodb.net/${MONGODB_DBNAME}?retryWrites=true&w=majority";

const uri = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DBNAME}`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.set("useFindAndModify", true);
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.info(`Example app listening at http://localhost:${PORT}`);
    });
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// app.get("/send", (req, res) => {
// const Cat = mongoose.model("Meow", { name: String });

// const kitty = new Cat({ name: "Zildjian" });
// kitty
//   .save()
//   .then(() => res.send(["Success"]))
//   .catch(() => console.log("Error"));

//   res.send(req.params.query);
// });
app.get("/send:query?", function (req, res) {
  var data = req.query.data;

  var Schema = mongoose.Schema;
  var randSchema = new Schema({
    name: String,
    _enabled: Boolean,
  });
  res.send(randSchema);
  return;

  const Cat = mongoose.model("Rand", randSchema);

  const kitty = new Cat({ name: "data", _enabled: false });
  kitty
    .save()
    .then(() => res.send(["Success", Cat]))
    .catch(() => console.log("Error"));

  // mongoose.connection.close();

  res.send(kitty);
});
