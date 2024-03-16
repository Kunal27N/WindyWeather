import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import * as helper from "./functions.js";
import dotenv from "dotenv";



dotenv.config();

const app = express();
const port = 3000;
const myKey = process.env.myKey;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));


app.get("/", (req, res) => {
  res.render("home.ejs");
  
});
app.post("/weather", async (req, res) => {
  const city = req.body.loc;
  try {
    const response = await axios.get(baseUrl, {
      params: {
        q: city,
        appid: myKey,
        units: "metric",
      },
    });
    const data = response.data;
    const aqiResp = await axios.get(
      "http://api.openweathermap.org/data/2.5/air_pollution",
      {
        params: {
          lat: data.coord.lat,
          lon: data.coord.lon,
          appid: myKey,
        },
      }
    );
    const aqiData = aqiResp.data.list[0];
    let idx;
    const foreC = await axios.get(
      "http://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat: data.coord.lat,
          lon: data.coord.lon,
          appid: myKey,
          units: "metric",
        },
      }
    );
    const list = await foreC.data.list;
    res.render("index.ejs", {
      location: city,
      data: data,
      aqiData: aqiData,
      list: list,
      helper: helper,
    });
  } catch (e) {
    res.send("City not found");
  }
});
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
