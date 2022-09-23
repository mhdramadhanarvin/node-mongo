"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// Constants
const app = express_1.default();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";
const { MONGODB_CLOUD, MONGODB_HOST, MONGODB_PORT, MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_DBNAME, } = process.env;
const uri = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DBNAME}`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
let mongooseStatus = false;
mongoose.set("useFindAndModify", true);
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    mongooseStatus = true;
    console.log(`Success connect to Mongo ${uri}`);
})
    .catch(() => {
    mongooseStatus = false;
    console.log(`Can't connect to Mongo ${uri}`);
});
app.listen(PORT, () => {
    console.info(`App listening at http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
    let data = {
        mongo: {
            status: mongooseStatus,
            host: uri,
            version: mongoose.version,
        },
    };
    res.send(data);
});
