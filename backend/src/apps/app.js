const express = require("express");
const app = express();
const config = require("config");
const cors = require("cors")
const cookieParser = require("cookie-parser")


const corsOption = {
    origin: "http://localhost:3000" ,// 1 đối tượng thì đặt trong " ", nhiều [ ], "*" tất cả đều thông qua.
    credentials: true
}

app.use(cors(corsOption))
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/assets", express.static(`${__dirname}/../public`));
app.set("views", `${__dirname}/../resources/views`);
app.set("view engine", "ejs");
app.use(config.get("app.prefixApiVersion"), require(`${__dirname}/../routers/web`));
app.use(require(`${__dirname}/../routers/getImagesProduct.js`))

module.exports = app;
